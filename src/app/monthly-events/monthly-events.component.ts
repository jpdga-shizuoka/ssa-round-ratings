import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { CommonService } from '../common.service';
import { MonthlyEventsDataSource, MonthlyEvent } from './monthly-events-datasource';
import { BreakpointObserver, Observable, map, shareReplay, isHandset } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-monthly-events',
  templateUrl: './monthly-events.component.html',
  styleUrls: ['./monthly-events.component.css'],
  animations: [detailExpand],
})
export class MonthlyEventsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<MonthlyEvent>;
  dataSource: MonthlyEventsDataSource;
  isHandset$: Observable<boolean>;
  expandedElement: MonthlyEvent | null;
  showDetail = false;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs ? ['location', 'day'] : ['location', 'day', 'month']),
      shareReplay()
    )
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.dataSource = new MonthlyEventsDataSource(this.cs);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getDay(event: MonthlyEvent): string {
    return this.cs.getMonthlyDay(event.schedule);
  }

  getMonth(event: MonthlyEvent): string {
    return this.cs.getMonth(event.schedule);
  }

  getLocation(event: MonthlyEvent): string {
    const name = this.cs.getLocationName(event.location);
    const location = this.cs.getLocation(event.location);
    const region = this.cs.getPrefecture(location.prefecture);
    return `${name}, ${region}`;
  }
}
