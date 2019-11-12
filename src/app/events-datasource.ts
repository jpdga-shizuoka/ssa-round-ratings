import { AbstractEventsDataSource } from './abstract-events-datasource';
import { EventInfo } from './models';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventsDataSource extends AbstractEventsDataSource<EventInfo> {
  constructor(data: EventInfo[]) {
    super(data);
  }
}
