import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { BaseEventsDataSource } from './base-events-datasource';
import { BreakpointObserver, Observable, isHandset } from './utilities';

export abstract class BaseEventsComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<T>;
  isHandset$: Observable<boolean>;
  expandedElement: T | null;
  showDetail = false;

  constructor(
    public dataSource: BaseEventsDataSource<T>,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
