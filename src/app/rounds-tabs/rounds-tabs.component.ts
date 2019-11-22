import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material/table';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoundInfo, EventInfo, GeoMarker } from '../models';
import { CommonService } from '../common.service';
import { isHandset } from '../utilities';

const DISPLAYED_COLUMNS = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];
const TABS_TITLE = ['Results', 'Map'];

@Component({
  selector: 'app-rounds-tabs',
  templateUrl: './rounds-tabs.component.html',
  styleUrls: ['./rounds-tabs.component.css']
})
export class RoundsTabsComponent implements OnInit {
  tableSource: MatTableDataSource<RoundInfo>;
  mapSource$: BehaviorSubject<GeoMarker[]>;
  isHandset$: Observable<boolean>;
  rounds: RoundInfo[];
  markerSelected: Subject<GeoMarker>;
  selectedTab: number;

  constructor(
    private cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.rounds = this.cs.getRounds();
    this.tableSource = new MatTableDataSource<RoundInfo>(this.rounds);
    this.mapSource$ = new BehaviorSubject<GeoMarker[]>([]);
    this.markerSelected = new Subject<GeoMarker>();
    this.selectedTab = 0;
    const markers = this.makeMaerkersFromRounds(this.rounds);
    this.mapSource$.next(markers);
  }

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[hs ? 0 : 1])
    );
  }

  get tableTitle() {
    return this.cs.getMenuAliase(TABS_TITLE[0]);
  }

  get mapTitle() {
    return this.cs.getMenuAliase(TABS_TITLE[1]);
  }

  onMarkerSelected(marker: GeoMarker) {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }

  private makeMaerkersFromRounds(rounds: RoundInfo[]): GeoMarker[] {
    const markers: GeoMarker[] = [];
    const eventTitles: string[] = [];
    for (const round of rounds) {
      const event = this.cs.getEvent(round.event);
      const location = this.cs.getLocation(event.location);
      const eventTitle = this.cs.getEventTitle(event.title);
      if (eventTitles.indexOf(eventTitle) >= 0) {
        continue;
      }
      const marker = {
        position: {
          lat: location.geolocation[0],
          lng: location.geolocation[1]
        },
        location: event.location,
        title: eventTitle,
      };
      eventTitles.push(eventTitle);
      markers.push(marker);
    }
    return markers;
  }
}
