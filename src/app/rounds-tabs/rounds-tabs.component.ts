import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoMarker } from '../map-common';
import { isHandset } from '../ng-utilities';

const EVENT_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const ROUND_COLUMNS = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];

@Component({
  selector: 'app-rounds-tabs',
  templateUrl: './rounds-tabs.component.html',
  styleUrls: ['./rounds-tabs.component.css']
})
export class RoundsTabsComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  markerSelected: Subject<GeoMarker>;
  selectedTab = 0;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    this.markerSelected = new Subject<GeoMarker>();
  }

  ngOnInit(): void {
    this.subscription = this.route.url.subscribe(url => {
      switch (url[1]?.path) {
        case 'events':
          this.selectedTab = 0;
          break;
        case 'rounds':
          this.selectedTab = 1;
          break;
        case 'videos':
          this.selectedTab = 2;
          break;
        case 'locations':
          this.selectedTab = 3;
          break;
        default:
          this.selectedTab = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

  onMarkerSelected(marker: GeoMarker): void {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }
}
