import { AbstractEventsDataSource } from '../abstract-events-datasource';
import { EventInfo } from '../models';
import EVENTS from '../../assets/model/monthly-events.json';

export { EventInfo };

/**
 * Data source for the LocalEvents view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MonthlyEventsDataSource extends AbstractEventsDataSource<EventInfo> {
  constructor() {
    super(eventData());
  }
}

function eventData(): EventInfo[] {
  return EVENTS;
}
