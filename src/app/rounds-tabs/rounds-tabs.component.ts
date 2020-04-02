import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoundInfo, EventInfo, VideoInfo, GeoMarker } from '../models';
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
  roundsSource: MatTableDataSource<RoundInfo>;
  videosSource: MatTableDataSource<VideoInfo>;
  mapSource$: BehaviorSubject<GeoMarker[]>;
  isHandset$: Observable<boolean>;
  rounds: RoundInfo[];
  markerSelected: Subject<GeoMarker>;
  selectedTab = 0;

  constructor(
    private cs: CommonService,
    private route: ActivatedRoute,
    breakpointObserver: BreakpointObserver,
  ) {
    route.url.pipe(map(segments => console.log('url', segments)));
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.rounds = this.cs.getRounds();
    this.roundsSource = new MatTableDataSource<RoundInfo>(this.rounds);
    this.videosSource = new MatTableDataSource<VideoInfo>();
    this.mapSource$ = new BehaviorSubject<GeoMarker[]>([]);
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
    this.doLazyLoading();
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

  get videos() {
    return this.cs.getMenuAliase('Videos');
  }

  onMarkerSelected(marker: GeoMarker) {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }

  private doLazyLoading() {
    setTimeout(() => {
      const lists = this.cs.getPastLists();
      this.videosSource.data = lists.videos;
      const markers = this.makeMaerkersFromRounds(this.rounds);
      this.mapSource$.next(markers);
    });
  }

  private makeMaerkersFromRounds(rounds: RoundInfo[]): GeoMarker[] {
    const markers: GeoMarker[] = [];
    const eventTitles: string[] = [];
    for (const round of rounds) {
      const event = this.cs.getEvent(round.event);
      const location = this.cs.getLocation(event.location);
      const eventTitle = this.cs.getEventTitle(event.title);
      const eventTitleLoc = eventTitle + event.location;
      if (eventTitles.indexOf(eventTitleLoc) >= 0) {
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
      eventTitles.push(eventTitleLoc);
      markers.push(marker);
    }
    return markers;
  }
}
