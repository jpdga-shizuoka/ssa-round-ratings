import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService, EventInfo } from '../common.service';
import { Observable } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand],
})
export class EventsTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource: MatTableDataSource<EventInfo>;
  @Input() displayedColumns$: Observable<string[]>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  expandedElement: EventInfo | null;
  showDetail = false;

  constructor(
    private cs: CommonService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTitle(event: EventInfo): string {
    return this.cs.getEventAliase(event.title);
  }

  getDate(event: EventInfo): string {
    return this.cs.getDate(event);
  }

  getLocation(event: EventInfo): string {
    const name = this.cs.getLocationName(event.location);
    const location = this.cs.getLocation(event.location);
    const region = this.cs.getPrefecture(location.prefecture);
    return `${name}, ${region}`;
  }

  getDay(event: EventInfo): string {
    return this.cs.getMonthlyDay(event.schedule);
  }

  getMonth(event: EventInfo): string {
    return this.cs.getMonth(event.schedule);
  }
}
