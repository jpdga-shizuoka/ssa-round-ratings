import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService, RoundInfo, EventInfo } from '../common.service';
import { Observable } from '../utilities';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  animations: [detailExpand],
})
export class RoundsTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource: MatTableDataSource<RoundInfo>;
  @Input() displayedColumns$: Observable<string[]>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  expandedElement: RoundInfo | null;
  showDetail = false;
  search: string;

  constructor(
    private cs: CommonService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: RoundInfo, filters: string): boolean => {
      const matchFilter = [];
      const filterArray = filters.split('&');
      const columns = [ this.cs.getEventAliase(data.event),
                        data.event,
                        data.round,
                        data.date,
                        data.hla,
                        data.holes,
                        data.ssa,
                        data.category,
      ];
      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => {
          if (column != null) {
            const scolumn = typeof column === 'number' ? column.toString() : column;
            customFilter.push(scolumn.toLowerCase().includes(filter));
          }
        });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND
    };

    this.dataSource.sortingDataAccessor = (item: RoundInfo, property: string) => {
      switch (property) {
        case 'event':
          return this.cs.getEventTitle(item.event);
        case 'year':
          return new Date(item.date);
        default:
          // default sorting
          return item[property];
      }
    };

    if (this.route.snapshot.queryParamMap.has('search')) {
      const filter = this.route.snapshot.queryParamMap.get('search');
      this.dataSource.filter = filter;
      this.search = filter;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.search = '';
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEventName(round: RoundInfo): string {
    return this.cs.getEventAliase(round.event);
  }

  getYear(time: string) {
    const date = new Date(time);
    return date.getFullYear();
  }
}
