import { AbstractEventsDataSource } from './abstract-events-datasource';
import { AbstractEventsComponent } from './abstract-events.component';
import { BreakpointObserver } from './utilities';
import { EventInfo } from './models';
import { CommonService } from './common.service';

export class EventsComponent extends AbstractEventsComponent<EventInfo> {
  constructor(
    private cs: CommonService,
    dataSource: AbstractEventsDataSource<EventInfo>,
    breakpointObserver: BreakpointObserver,
  ) {
    super(dataSource, breakpointObserver);
  }

  getTitle(event: EventInfo): string {
    return this.cs.getEventAliase(event.title);
  }

  getDate(event: EventInfo): string {
    try {
      const from = (new Date(event.period.from))
        .toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
      const to = (new Date(event.period.to))
        .toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
      return `${from} - ${to}`;
    } catch {
      const from = (new Date(event.period.from)).toLocaleDateString();
      const to = (new Date(event.period.to)).toLocaleDateString();
      return `${from} - ${to}`;
    }
  }

  getLocation(event: EventInfo): string {
    const name = this.cs.getLocationName(event.location);
    const location = this.cs.getLocation(event.location);
    const region = this.cs.getPrefecture(location.prefecture);
    return `${name}, ${region}`;
  }

  getDay(event: EventInfo): string {
    return this.cs.getMonthlyDay(event.schedule);
  }

  getMonth(event: EventInfo): string {
    return this.cs.getMonth(event.schedule);
  }
}
