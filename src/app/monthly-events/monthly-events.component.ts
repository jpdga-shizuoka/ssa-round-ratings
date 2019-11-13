import { Component } from '@angular/core';

import { MonthlyEventsDataSource } from './monthly-events-datasource';
import { EventsComponent } from '../events.component';
import { CommonService } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-monthly-events',
  templateUrl: './monthly-events.component.html',
  styleUrls: ['./monthly-events.component.css'],
  animations: [detailExpand],
})
export class MonthlyEventsComponent extends EventsComponent {

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs ? ['location', 'day'] : ['location', 'day', 'month']),
      shareReplay()
    );
  }

  get monthlyEvents() {
    return this.cs.getMenuAliase('Monthly Events');
  }

  get Map() {
    return this.cs.getMenuAliase('Map');
  }

  constructor(
    cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(cs, new MonthlyEventsDataSource(), breakpointObserver);
  }
}
