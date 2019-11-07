import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { UpcomingEventsDataSource, EventInfo } from './upcoming-events-datasource';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UpcomingEventsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<EventInfo>;
  dataSource: UpcomingEventsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title'];

  constructor(private cs: CommonService) {
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
