import { inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { EventInfo } from '../models';

/**
 * Data source for the CashTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CashTableDataSource extends MatTableDataSource<EventInfo> {
  private remote = inject(RemoteService);
  private localize = inject(LocalizeService);
  loading = true;

  constructor() {
    super();
    this.setupFilter();
  }
  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  override connect(): BehaviorSubject<EventInfo[]> {
    this.loading = true;
    this.remote.getCashOfEvents()
      .subscribe({
        next: events => {
          this.data = events;
        },
        error: err => console.error(err),
        complete: () => { this.loading = false; }
      });
    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  override disconnect(): void {}

  private setupFilter() {
    this.filterPredicate = (data: EventInfo, filters: string): boolean => {
      const matchFilter: boolean[] = [];
      const filterArray = filters.split('&');
      const columns: string[] = [];

      if (data.title) {
        columns.push(data.title);
      }

      if (data.title && this.localize) {
        columns.push(this.localize.transform(data.title, 'event'));
      }

      if (data.period) {
        columns.push(data.period.from);
        columns.push(data.period.to);
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
