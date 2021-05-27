import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RemoteService, EventCategory, EventInfo } from '../remote.service';

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
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect() {
    this.loading = true;
    this.subscription = this.remote.getEvents(this.category)
      .pipe(
        map(events => this.limit ? events.slice(0, this.limit) : events),
        tap(events => events.forEach(
          event => event.location$ = this.remote.getLocation(event.location))))
      .subscribe(
        events => this.data = events,
        err => console.log(err),
        () => this.loading = false
      );
    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.subscription?.unsubscribe();
  }
}
