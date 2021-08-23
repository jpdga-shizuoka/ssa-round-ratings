import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { RemoteService, RoundInfo } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { calcRoundStat } from '../libs';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoundsDataSource extends MatTableDataSource<RoundInfo> {
  loading = true;

  constructor(
    private readonly remote: RemoteService,
    private readonly localize: LocalizeService,
    private readonly limit?: number
  ) {
    super();
    this.setupFilter();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): BehaviorSubject<RoundInfo[]> {
    this.loading = true;
    this.remote.getRounds()
      .pipe(
        map(rounds => this.limit ? rounds.slice(0, this.limit) : rounds),
        tap(rounds => calcRoundStat(rounds))
      ).subscribe(
        rounds => { this.data = rounds; },
        err => console.log(err),
        () => { this.loading = false; }
      );

    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    super.disconnect();
  }

  private setupFilter() {
    this.filterPredicate = (data: RoundInfo, filters: string): boolean => {
      const matchFilter: boolean[] = [];
      const filterArray = filters.split('&');
      const columns: string[] = [data.round, data.date];
      if (data.ssa) {
        columns.push(data.ssa.toString());
      }
      if (data.category) {
        columns.push(data.category);
      }
      if (data.locationTitle) {
        columns.push(data.locationTitle);
        columns.push(this.localize.transform(data.locationTitle, 'location'));
      }
      if (data.eventTitle) {
        columns.push(data.eventTitle);
        columns.push(this.localize.transform(data.eventTitle, 'event'));
      }

      filterArray.forEach(filter => {
        const customFilter: boolean[] = [];
        columns.forEach(column =>
          customFilter.push(column.toLowerCase().includes(filter)));
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND
    };
  }
}
