import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventCategory } from '../models';
import { GeoMarker } from '../map-common';
import { isHandset } from '../ng-utilities';
import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';

const DISPLAYED_COLUMNS: {
  [string: string]: string[][];
} = {
  upcoming: [['date', 'title'], ['date', 'title', 'location']],
  local: [['date', 'title'], ['date', 'title', 'location']],
  monthly: [['location', 'day'], ['location', 'day', 'month']]
};
const TABS_TITLE: {
  [string: string]: string[];
} = {
  upcoming: ['Official', 'Location map'],
  local: ['Local', 'Location Map'],
  monthly: ['Monthly', 'Location Map']
};

@Component({
  selector: 'app-events-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class EventsTabsComponent implements AfterViewInit {
  category: EventCategory;
  isHandset$: Observable<boolean>;
  markerSelected: Subject<GeoMarker>;
  selectedTab: number;

  constructor(
    private route: ActivatedRoute,
    private bottomsheet: MatBottomSheet,
    breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    this.markerSelected = new Subject<GeoMarker>();
    this.selectedTab = 0;

    if (this.route.snapshot.url.length !== 2) {
      throw new TypeError(`unexpected path: ${this.route.snapshot.url.toString()}`);
    }
    this.category = this.route.snapshot.url[1].path as EventCategory;
    if (this.category !== 'upcoming'
    && this.category !== 'local'
    && this.category !== 'monthly') {
      throw new TypeError(`unexpected category: ${this.category}`);
    }
  }

  ngAfterViewInit(): void {
    if (this.category === 'monthly'
    && sessionStorage.getItem('monthlyConfirmed') !== 'true') {
      this.openNoticeBottomsheet();
    }
  }

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[this.category][hs ? 0 : 1])
    );
  }

  get tableTitle(): string {
    return TABS_TITLE[this.category][0];
  }

  get mapTitle(): string {
    return TABS_TITLE[this.category][1];
  }

  get title(): string {
    let schedule = 'Schedule';
    switch (this.category) {
      case 'local':
        schedule = 'Local Events';
        break;
      case 'monthly':
        schedule = 'Monthly Events';
        break;
    }
    return schedule;
  }

  onMarkerSelected(marker: GeoMarker): void {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }

  private openNoticeBottomsheet(): void {
    const bottomsheetRef = this.bottomsheet.open(NoticeBottomsheetComponent);

    bottomsheetRef.afterDismissed()
      .subscribe(() => sessionStorage.setItem('monthlyConfirmed', 'true'));

    setTimeout(() => bottomsheetRef.dismiss(), 5000);
  }
}
