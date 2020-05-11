import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventInfo, GeoMarker } from '../models';
import { CommonService } from '../common.service';
import { isHandset } from '../utilities';
import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';

const DISPLAYED_COLUMNS = {
  upcoming: [['date', 'title'],   ['date', 'title', 'location']],
  local:    [['date', 'title'],   ['date', 'title', 'location']],
  monthly:  [['location', 'day'], ['location', 'day', 'month']]
};
const TABS_TITLE = {
  upcoming: ['Official', 'Location map'],
  local:    ['Local', 'Location Map'],
  monthly:  ['Monthly', 'Location Map']
};

@Component({
  selector: 'app-events-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class EventsTabsComponent implements OnInit, AfterViewInit {

  category: string;
  isHandset$: Observable<boolean>;
  markerSelected: Subject<GeoMarker>;
  selectedTab: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cs: CommonService,
    private bottomsheet: MatBottomSheet,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    this.markerSelected = new Subject<GeoMarker>();
    this.selectedTab = 0;

    if (this.route.snapshot.url.length !== 2) {
      return;
    }
    this.category = this.route.snapshot.url[1].path;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

  get tableTitle() {
    return TABS_TITLE[this.category][0];
  }

  get mapTitle() {
    return TABS_TITLE[this.category][1];
  }

  get title() {
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

  back() {
    this.location.back();
  }

  onMarkerSelected(marker: GeoMarker) {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }

  private openNoticeBottomsheet() {
    const bottomsheetRef = this.bottomsheet.open(NoticeBottomsheetComponent);

    bottomsheetRef.afterDismissed()
    .subscribe(() => sessionStorage.setItem('monthlyConfirmed', 'true'));

    setTimeout(() => bottomsheetRef.dismiss(), 5000);
  }

  // private makeMaerkersFromEvents(events: EventInfo[]) {
  //   const markers: GeoMarker[] = [];
  //   for (const event of events) {
  //     const location = this.cs.getLocation(event.location);
  //     const marker = {
  //       position: {
  //         lat: location.geolocation[0],
  //         lng: location.geolocation[1]
  //       },
  //       location: event.location,
  //       title: event.title,
  //     };
  //     markers.push(marker);
  //   }
  //   this.mapSource$.next(markers);
  // }
}
