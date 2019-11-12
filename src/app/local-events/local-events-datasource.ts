import { AbstractEventsDataSource } from '../abstract-events-datasource';
import { EventInfo } from '../models';
import EVENTS from '../../assets/model/local-events.json';

export { EventInfo };

/**
 * Data source for the LocalEvents view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LocalEventsDataSource extends AbstractEventsDataSource<EventInfo> {
  constructor() {
    super(eventData());
  }
}

function eventData(): EventInfo[] {
  const events: EventInfo[] = [];
  const now = Date.now();
  for (const event of EVENTS) {
    const date = new Date(event.period.to);
    if (date.getTime() > now) {
      events.push(event);
    }
  }
  events.sort((a, b) => {
    const t1 = new Date(a.period.from);
    const t2 = new Date(b.period.to);
    return t1.getTime() - t2.getTime();
  });
  return events;
}
