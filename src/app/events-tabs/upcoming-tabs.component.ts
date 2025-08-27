import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';

import { EventsTabsComponent } from './events-tabs.component';
import { EventsTableComponent } from '../events-table/events-table.component';
import { EventsMapComponent } from '../events-map/events-map.component';
import { LocalizePipe } from '../localize.pipe';

const DISPLAYED_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const TITLES = ['Event', 'Location'];
const TABS = ['events', 'locations'];

@Component({
    selector: 'app-upcoming-tabs',
    templateUrl: './events-tabs.component.html',
    styleUrls: ['./events-tabs.component.css'],
    imports: [
    RouterModule,
    MatTabsModule,
    EventsTableComponent,
    EventsMapComponent,
    LocalizePipe
]
})
export class UpcomingTabsComponent extends EventsTabsComponent {
  constructor(
    router: Router,
    route: ActivatedRoute,
    location: Location,
    breakpointObserver: BreakpointObserver
  ) {
    super(router, route, location, breakpointObserver);
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.titles = TITLES;
    this.tabs = TABS;
    this.category = 'upcoming';
  }
}