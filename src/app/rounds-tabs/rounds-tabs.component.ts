import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoMarker } from '../map-common';
import { isHandset } from '../ng-utilities';

const EVENT_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const ROUND_COLUMNS = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];
const TABS = ['events', 'rounds', 'videos', 'locations'];

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
    private location: Location,
    private route: ActivatedRoute,
    breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    this.markerSelected = new Subject<GeoMarker>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const tag = params.tagname as string;
      const index = TABS.findIndex((value => value === tag));
      if (index >= 0 && index < TABS.length) {
        this.selectedTab = index;
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

  onSelectedTabChange(event: MatTabChangeEvent): void {
    const path = this.location.path().split('/');
    path[path.length - 1] = TABS[this.selectedTab];
    this.location.replaceState(path.join('/'));
  }
}
