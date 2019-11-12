import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { UpcomingEventsDataSource, EventInfo } from './upcoming-events-datasource';
import { CommonService } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay, isHandset } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  animations: [detailExpand],
})
export class UpcomingEventsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<EventInfo>;
  dataSource: UpcomingEventsDataSource;
  expandedElement: EventInfo | null;
  showDetail = false;
  isHandset$: Observable<boolean>;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs ? ['date', 'title'] : ['date', 'title', 'location']),
      shareReplay()
    );
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.dataSource = new UpcomingEventsDataSource(this.cs);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getTitle(event: EventInfo): string {
    return this.cs.getEventAliase(event.title);
  }

  getDate(event: EventInfo): string {
    try {
      const from = (new Date(event.period.from))
        .toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
      const to = (new Date(event.period.to))
        .toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
      return `${from} - ${to}`;
    } catch {
      const from = (new Date(event.period.from)).toLocaleDateString();
      const to = (new Date(event.period.to)).toLocaleDateString();
      return `${from} - ${to}`;
    }
  }

  getLocation(event: EventInfo): string {
    const name = this.cs.getLocationName(event.location);
    const location = this.cs.getLocation(event.location);
    const region = this.cs.getPrefecture(location.prefecture);
    return `${name}, ${region}`;
  }
}
