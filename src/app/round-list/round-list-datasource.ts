import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoundId, RoundInfo } from '../models';
import { RemoteService } from '../remote.service';
import { calcRoundStat } from '../libs';

/**
 * Data source for the RoundList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoundListDataSource extends DataSource<RoundInfo> {

  constructor(
    private list: RoundId[],
    private remote: RemoteService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RoundInfo[]> {
    if (this.list) {
      return this.remote.getRounds(this.list).pipe(
        map(rounds => calcRoundStat(rounds))
      );
    } else {
      const list: RoundInfo[] = [];
      return of(list);
    }
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
}
