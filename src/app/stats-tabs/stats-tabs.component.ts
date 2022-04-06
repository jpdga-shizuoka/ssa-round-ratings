import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { RoutingTabsComponent } from '../routing-tabs/routing-tabs.component';

const TABS = ['difficulty', 'players', 'memberships', 'reports'];

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent extends RoutingTabsComponent {
  constructor(
    router: Router,
    route: ActivatedRoute,
    location: Location
  ) {
    super(router, route, location);
    this.tabs = TABS;
  }
}
