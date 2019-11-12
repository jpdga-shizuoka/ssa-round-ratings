import { Component } from '@angular/core';

import { UpcomingEventsDataSource } from './upcoming-events-datasource';
import { EventsComponent } from '../events.component';
import { CommonService } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  animations: [detailExpand],
})
export class UpcomingEventsComponent extends EventsComponent {

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs ? ['date', 'title'] : ['date', 'title', 'location']),
      shareReplay()
    );
  }

  constructor(
    cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(cs, new UpcomingEventsDataSource(), breakpointObserver);
  }
}
