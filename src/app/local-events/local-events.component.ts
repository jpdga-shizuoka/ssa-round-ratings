import { Component } from '@angular/core';

import { LocalEventsDataSource } from './local-events-datasource';
import { EventsComponent } from '../events.component';
import { CommonService } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-local-events',
  templateUrl: './local-events.component.html',
  styleUrls: ['./local-events.component.css'],
  animations: [detailExpand],
})
export class LocalEventsComponent extends EventsComponent {

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
    super(cs, new LocalEventsDataSource(), breakpointObserver);
  }
}
