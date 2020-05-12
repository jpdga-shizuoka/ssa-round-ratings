import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap, map } from 'rxjs/operators';

import { RemoteService, RoundInfo } from '../remote.service';
import { LocalizeService } from '../localize.service';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoundsDataSource extends MatTableDataSource<RoundInfo> {

  constructor(
    private readonly remote: RemoteService,
    private readonly localize: LocalizeService,
    private readonly limit?: number,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect() {
    this.remote.getRounds()
      .pipe(
        map(rounds => this.limit ? rounds.slice(0, this.limit) : rounds),
        tap(rounds => updateMembers(rounds))
      ).subscribe(rounds => this.data = rounds);

    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    super.disconnect();
  }

  private setupFilter() {
    this.filterPredicate = (data: RoundInfo, filters: string): boolean => {
      const matchFilter = [];
      const filterArray = filters.split('&');
      const eventAliase = this.localize.transform(data.event);
      // const event = this.cs.getEvent(data.event);
      // const locationName = this.cs.getLocationName(event.location);
      const columns = [ eventAliase,
                        // locationName,
                        // event.location,
                        data.event,
                        data.round,
                        data.date,
                        data.hla,
                        data.holes,
                        data.ssa,
                        data.category,
      ];
      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => {
          if (column != null) {
            const scolumn = typeof column === 'number' ? column.toString() : column;
            customFilter.push(scolumn.toLowerCase().includes(filter));
          }
        });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND
    };
  }
}

function updateMembers(rounds: RoundInfo[]) {
  for (const round of rounds) {
    if (round.ratings) {
      round.weight = calcWeight(round.ratings.player1, round.ratings.player2);
      round.offset = calcOffset(round);
      round.ssa = calcSsa(round);
      round.category = calcCategory(round.ssa);
    }
  }
  return rounds;
}

function calcWeight(player1: { score: number, rating: number }, player2: { score: number, rating: number }) {
  return (player1.rating - player2.rating) / (player1.score - player2.score);
}

function calcOffset(round: RoundInfo) {
  return round.ratings.player1.rating - round.weight * round.ratings.player1.score;
}

function calcSsa(round: RoundInfo) {
  const holes = round.holes || 18;
  const regulation = holes / 18;
  return (1000 - round.offset) / round.weight / regulation;
}

function calcCategory(ssa: number) {
  if (ssa < 48) {
    return 'A';
  } else if (ssa < 54) {
    return '2A';
  } else if (ssa < 60) {
    return '3A';
  } else if (ssa < 66) {
    return '4A';
  } else {
    return '5A';
  }
}