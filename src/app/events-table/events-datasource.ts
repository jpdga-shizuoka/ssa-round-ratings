import { MatTableDataSource } from '@angular/material/table';
import { Subscription, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RemoteService, EventCategory, EventInfo } from '../remote.service';
import { LocalizeService } from '../localize.service';

export { EventInfo };

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventsDataSource extends MatTableDataSource<EventInfo> {
  private subscription?: Subscription;
  loading = true;

  constructor(
    private readonly remote: RemoteService,
    private readonly category: EventCategory,
    private readonly limit?: number,
    private readonly localize?: LocalizeService
  ) {
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
    this.subscription = this.remote.getEvents(this.category)
      .pipe(
        map(events => this.limit ? events.slice(0, this.limit) : events),
        tap(events => events.forEach(
          event => { event.location$ = this.remote.getLocation(event.location); }
        )))
      .subscribe(
        events => { this.data = events; },
        err => console.log(err),
        () => { this.loading = false; }
      );
    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  override disconnect(): void {
    this.subscription?.unsubscribe();
  }

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
