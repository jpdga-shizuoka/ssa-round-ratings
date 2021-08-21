import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { RoutingTabsComponent } from '../routing-tabs/routing-tabs.component';

const TABS = ['difficulty', 'players'];

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent extends RoutingTabsComponent {
  constructor(
    route: ActivatedRoute,
    location: Location
  ) {
    super(route, location);
    this.tabs = TABS;
  }
}
