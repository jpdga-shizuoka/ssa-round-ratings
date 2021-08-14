import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { EventInfo, EventCategory } from '../models';
import { RemoteService, UserFilter } from '../remote.service';
import { event2key, name2key } from '../libs';

/**
 * Data source for the RoundList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventListDataSource extends DataSource<EventInfo> {

  constructor(
    private key: EventInfo,
    private remote: RemoteService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EventInfo[]> {
    return this.remote.getEvents('alltime', this.filter());
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  private filter(): UserFilter {
    const keys = event2key(this.key.title);
    if (!keys?.key) {
      return (events: EventInfo[], category: EventCategory) => events;
    } else {
      return (events: EventInfo[], category: EventCategory) =>
        events.filter(event => 
          event.id !== this.key.id &&
          event.title ? name2key(event.title).toLocaleLowerCase().includes(keys.key) : false)
    }
  }
}
