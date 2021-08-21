import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isHandset } from '../ng-utilities';
import { EventCategory } from '../models';

@Component({
  template: ''
})
export class EventsTabsComponent implements OnInit {
  isHandset$: Observable<boolean>;
  selectedTab: number;
  category!: EventCategory;
  displayedColumns!: string[][];
  titles!: string[];
  tabs!: string[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(this.breakpointObserver);
    this.selectedTab = 0;
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
    this.route.params.subscribe(params => {
      const tag = params.tagname as string;
      const index = this.tabs.findIndex((value => value === tag));
      if (index >= 0 && index < this.tabs.length) {
        this.selectedTab = index;
      }
    });
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    const path = this.location.path().split('/');
    path[path.length - 1] = this.tabs[this.selectedTab];
    this.location.replaceState(path.join('/'));
  }
}
