import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isHandset } from '../ng-utilities';
import { RoutingTabsComponent } from '../routing-tabs/routing-tabs.component';

const EVENT_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const ROUND_COLUMNS = [['event', 'hla', 'ssa', 'td'], ['year', 'event', 'round', 'hla', 'ssa', 'td']];
const TABS = ['events', 'rounds', 'videos', 'locations'];

@Component({
  selector: 'app-rounds-tabs',
  templateUrl: './rounds-tabs.component.html',
  styleUrls: ['./rounds-tabs.component.css']
})
export class RoundsTabsComponent extends RoutingTabsComponent {
  isHandset$: Observable<boolean>;

  constructor(
    router: Router,
    location: Location,
    route: ActivatedRoute,
    breakpointObserver: BreakpointObserver
  ) {
    super(router, route, location);
    this.tabs = TABS;
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get eventsColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => EVENT_COLUMNS[hs ? 0 : 1])
    );
  }

  get roundsColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => ROUND_COLUMNS[hs ? 0 : 1])
    );
  }
}
