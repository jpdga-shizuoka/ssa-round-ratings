import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { EventsTabsComponent } from './events-tabs.component';

const DISPLAYED_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const TITLES = ['Event', 'Location'];
const TABS = ['events', 'locations'];

@Component({
  selector: 'app-local-tabs',
  templateUrl: './local-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
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