import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService, RoundInfo } from '../common.service';
import { BreakpointObserver, Observable, map, shareReplay, isHandset } from '../utilities';
import { detailExpand } from '../animations';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-past-rounds',
  templateUrl: './past-rounds.component.html',
  styleUrls: ['./past-rounds.component.css'],
  animations: [detailExpand],
})
export class PastRoundsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<RoundInfo>;
  expandedElement: RoundInfo | null;
  search: string;
  showDetail = false;
  isHandset$: Observable<boolean>;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => hs
        ? ['event', 'hla', 'ssa']
        : ['year', 'event', 'round', 'hla', 'ssa']),
      shareReplay()
    );
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private cs: CommonService
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.cs.getRounds());

    this.dataSource.filterPredicate = (data: RoundInfo, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split('&');
      const columns = [ data.event,
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

    this.dataSource.sortingDataAccessor = (item, property) => {
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

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
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
