import { Component } from '@angular/core';

import { LocalEventsDataSource, EventInfo } from './local-events-datasource';
import { BaseEventsComponent } from '../base-events.component';
import { CommonService } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-local-events',
  templateUrl: './local-events.component.html',
  styleUrls: ['./local-events.component.css'],
  animations: [detailExpand],
})
export class LocalEventsComponent extends BaseEventsComponent<EventInfo> {

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs ? ['date', 'title'] : ['date', 'title', 'location']),
      shareReplay()
    );
  }

  constructor(
    private cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(new LocalEventsDataSource(), breakpointObserver);
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
}
