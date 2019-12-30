import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subject, Subscription } from 'rxjs';

import { CommonService, RoundInfo, EventInfo, GeoMarker } from '../common.service';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  animations: [detailExpand],
})
export class RoundsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: MatTableDataSource<RoundInfo>;
  @Input() displayedColumns$: Observable<string[]>;
  @Input() markerSelected$: Subject<GeoMarker>;
  @Input() search: string;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  expandedElement: RoundInfo | null;
  showDetail = false;
  private subscription: Subscription;

  constructor(
    private cs: CommonService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: RoundInfo, filters: string): boolean => {
      const matchFilter = [];
      const filterArray = filters.split('&');
      const event = this.cs.getEvent(data.event);
      const eventName = this.cs.getEventAliase(data.event);
      const locationName = this.cs.getLocationName(event.location);
      const columns = [ eventName,
                        locationName,
                        event.location,
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
      this.expandedElement = null;  // workaround when a detail info is expanded
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

    this.subscription = this.markerSelected$.subscribe({
      next: marker => {
        const locationName = this.cs.getLocationName(marker.location);
        this.applyFilter(locationName);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEventSlected(location: string) {
    this.applyFilter(location);
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.search = '';
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search = filterValue;
  }

  get showHistory() {
    if (!this.expandedElement) {
      return false;
    }
    if (!this.search) {
      return true;
    }
    const title = this.cs.getEventTitle(this.expandedElement.event);
    if (this.search.includes(title)
    ||  this.search.includes(this.cs.getEventTitleAliase(title))) {
      return false;
    }
    return true;
  }

  getLength(round: RoundInfo) {
    return round.hla ? round.hla + 'm' : '';
  }

  getEventName(round: RoundInfo): string {
    return this.cs.getEventAliase(round.event);
  }

  getYear(time: string) {
    const date = new Date(time);
    return date.getFullYear();
  }
}
