import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventInfo, GeoMarker } from '../models';
import { CommonService } from '../common.service';
import { isHandset } from '../utilities';

const DISPLAYED_COLUMNS = {
  upcoming: [['date', 'title'],   ['date', 'title', 'location']],
  local:    [['date', 'title'],   ['date', 'title', 'location']],
  monthly:  [['location', 'day'], ['location', 'day', 'month']]
};
const TABS_TITLE = {
  upcoming: ['Upcoming Events', 'Map'],
  local:    ['Local Events', 'Map'],
  monthly:  ['Monthly Events', 'Map']
};

@Component({
  selector: 'app-events-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class EventsTabsComponent implements OnInit {

  category: string;
  tableSource: MatTableDataSource<EventInfo>;
  mapSource$: BehaviorSubject<GeoMarker[]>;
  isHandset$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    if (this.route.snapshot.url.length !== 2) {
      console.log('EventsTabsComponent.OnInit.unexpected url', this.route.snapshot.url);
      return;
    }
    this.category = this.route.snapshot.url[1].path;
    const events = this.cs.getEvents(this.category);
    if (!events) {
      console.log('EventsTabsComponent.OnInit.unexpected category', this.category);
      return;
    }
    this.tableSource = new MatTableDataSource(events);
    this.mapSource$ = new BehaviorSubject<GeoMarker[]>([]);
    this.makeMaerkersFromEvents(events);
  }

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[this.category][hs ? 0 : 1])
    );
  }

  get tableTitle() {
    return this.cs.getMenuAliase(TABS_TITLE[this.category][0]);
  }

  get mapTitle() {
    return this.cs.getMenuAliase(TABS_TITLE[this.category][1]);
  }

  private makeMaerkersFromEvents(events: EventInfo[]) {
    const markers: GeoMarker[] = [];
    for (const event of events) {
      const location = this.cs.getLocation(event.location);
      const marker = {
        latitude: location.geolocation[0],
        longitude: location.geolocation[1],
        location: event.location,
        event: event.title,
      };
      markers.push(marker);
    }
    this.mapSource$.next(markers);
  }
}
