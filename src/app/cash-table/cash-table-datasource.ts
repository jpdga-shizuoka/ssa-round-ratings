import { inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RemoteService } from '../remote.service';
import { EventInfo } from '../models';

/**
 * Data source for the CashTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CashTableDataSource extends MatTableDataSource<EventInfo> {
  private remote = inject(RemoteService);
  loading = true;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  override connect(): BehaviorSubject<EventInfo[]> {
    this.remote.getCashOfEvents()
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe({
        next: events => {
          this.data = events;
        },
        error: err => console.error(err)
      });
    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  override disconnect(): void {}
}
