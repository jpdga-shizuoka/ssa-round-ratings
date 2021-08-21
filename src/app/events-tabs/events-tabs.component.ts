import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isHandset } from '../ng-utilities';
import { EventCategory } from '../models';
import { RoutingTabsComponent } from '../routing-tabs/routing-tabs.component';

@Component({
  template: ''
})
export class EventsTabsComponent extends RoutingTabsComponent implements OnInit {
  isHandset$: Observable<boolean>;
  category!: EventCategory;
  displayedColumns!: string[][];
  titles!: string[];

  constructor(
    route: ActivatedRoute,
    location: Location,
    breakpointObserver: BreakpointObserver
  ) {
    super(route, location);
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => this.displayedColumns[hs ? 0 : 1])
    );
  }

  get tableTitle(): string {
    return this.titles[0];
  }

  get mapTitle(): string {
    return this.titles[1];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.titles) {
      throw new Error('[titles] must be initialized');
    }
    if (!this.category) {
      throw new Error('[category] must be initialized');
    }
    if (!this.displayedColumns$) {
      throw new Error('[displayedColumns$] must be initialized');
    }
  }
}
