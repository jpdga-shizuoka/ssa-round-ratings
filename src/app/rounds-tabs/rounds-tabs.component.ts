import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoMarker } from '../map-common';
import { isHandset } from '../ng-utilities';

const DISPLAYED_COLUMNS = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];
const TABS_TITLE = ['Rounds', 'Location map'];

@Component({
  selector: 'app-rounds-tabs',
  templateUrl: './rounds-tabs.component.html',
  styleUrls: ['./rounds-tabs.component.css']
})
export class RoundsTabsComponent implements OnInit {
  isHandset$: Observable<boolean>;
  markerSelected: Subject<GeoMarker>;
  selectedTab = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.markerSelected = new Subject<GeoMarker>();
    switch (this.route.snapshot.url[1]?.path) {
      case 'video':
        this.selectedTab = 1;
        break;
      case 'map':
        this.selectedTab = 2;
        break;
      default:
        this.selectedTab = 0;
    }
  }

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[hs ? 0 : 1])
    );
  }

  get tableTitle() {
    return TABS_TITLE[0];
  }

  get mapTitle() {
    return TABS_TITLE[1];
  }

  back() {
    this.location.back();
  }

  onMarkerSelected(marker: GeoMarker) {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }
}
