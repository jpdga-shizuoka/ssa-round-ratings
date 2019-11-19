import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventInfo, GeoMarker } from '../models';
import { CommonService } from '../common.service';
import { isHandset } from '../utilities';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
const MONTHLY_DIALOG_TITLE = [
  'Regarding the monthly schedule',
  '月例会のスケジュールについて'
];
const MONTHLY_DIALOG_CONTENT = [
  'This is just an annual schedule, please check in advance if you want to entry.',
  'ここに揚げたスケジュールはおおよその予定です。参加される際は事前に主催者等へのご確認を願います。'
];

@Component({
  selector: 'app-events-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class EventsTabsComponent implements OnInit, AfterViewInit {

  category: string;
  tableSource: MatTableDataSource<EventInfo>;
  mapSource$: BehaviorSubject<GeoMarker[]>;
  isHandset$: Observable<boolean>;
  markerSelected: Subject<GeoMarker>;
  selectedTab: number;

  constructor(
    private route: ActivatedRoute,
    private cs: CommonService,
    public dialog: MatDialog,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    this.markerSelected = new Subject<GeoMarker>();
    this.selectedTab = 0;
  }

  ngOnInit() {
    if (this.route.snapshot.url.length !== 2) {
      return;
    }
    this.category = this.route.snapshot.url[1].path;
    const events = this.cs.getEvents(this.category);
    if (!events) {
      return;
    }
    this.tableSource = new MatTableDataSource(events);
    this.mapSource$ = new BehaviorSubject<GeoMarker[]>([]);
    this.makeMaerkersFromEvents(events);
  }

  ngAfterViewInit() {
    if (this.category === 'monthly'
    && sessionStorage.getItem('monthlyConfirmed') !== 'true') {
      this.openMonthlyConfirmDialog();
    }
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

  onMarkerSelected(marker: GeoMarker) {
    this.markerSelected.next(marker);
    this.selectedTab = 0;
  }

  private openMonthlyConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: MONTHLY_DIALOG_TITLE[this.cs.primaryLanguage ? 0 : 1],
        content: MONTHLY_DIALOG_CONTENT[this.cs.primaryLanguage ? 0 : 1],
        confirmed: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.setItem('monthlyConfirmed', result);
    });
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
