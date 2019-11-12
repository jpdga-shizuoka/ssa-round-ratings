import { BaseEventsDataSource } from '../base-events-datasource';
import { EventInfo } from '../models';
import EVENTS from '../../assets/model/local-events.json';

export { EventInfo };

/**
 * Data source for the LocalEvents view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LocalEventsDataSource extends BaseEventsDataSource<EventInfo> {

  data: EventInfo[] = EVENTS;

  constructor() {
    super();
  }
}
