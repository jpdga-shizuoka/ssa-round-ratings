import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';

import { EventsTabsComponent } from './events-tabs.component';
import { LocalTableComponent } from '../events-table/local-table.component';
import { EventsMapComponent } from '../events-map/events-map.component';
import { LocalizePipe } from '../localize.pipe';

const DISPLAYED_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const TITLES = ['Event', 'Map'];
const TABS = ['events', 'map'];

@Component({
  selector: 'app-local-tabs',
  templateUrl: './local-tabs.component.html',
  styleUrls: ['./events-tabs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    LocalTableComponent,
    EventsMapComponent,
    LocalizePipe
  ]
})
export class LocalTabsComponent extends EventsTabsComponent {
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
    this.category = 'local';
  }
}