import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { UpcomingEventsDataSource, EventInfo } from './upcoming-events-datasource';
import { CommonService } from '../common.service';
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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService,
  ) {
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
}
