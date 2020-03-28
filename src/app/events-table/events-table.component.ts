import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Input, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';

import { CommonService, EventInfo, GeoMarker } from '../common.service';
import { EventCategory } from '../models';
import { detailExpand } from '../animations';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand],
})
export class EventsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: MatTableDataSource<EventInfo>;
  @Input() displayedColumns$: Observable<string[]>;
  @Input() markerSelected$: Subject<GeoMarker>;
  @Input() category: EventCategory;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: EventInfo | null;
  showDetail = false;
  pageSizeOptions = [10, 20, 50, 100];
  private subscription: Subscription;

  constructor(
    private cs: CommonService,
  ) {
  }

  ngOnInit() {
    if (this.markerSelected$) {
      this.subscription = this.markerSelected$.subscribe({
        next: marker => this.onMarkerSelected(marker)
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get isMinimum(): boolean {
    return this.dataSource.data.length <= this.pageSizeOptions[0];
  }

  get more(): string {
    return this.cs.primaryLanguage ? 'More...' : 'さらに見る';
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

  getRawClass(event: EventInfo) {
    return {
      canceled: this.isCanceled(event),
      'event-element-row': true,
      'event-expanded-row': this.isDetailExpand(event)
    };
  }

  isCanceled(event: EventInfo) {
    return event.status === 'CANCELED';
  }

  isDetailExpand(event: EventInfo) {
    if (!this.expandedElement) {
      return false;
    }
    if (this.expandedElement.title !== event.title) {
      return false;
    }
    if (this.expandedElement.period !== event.period) {
      return false;
    }
    if (event.schedule && (this.expandedElement.schedule !== event.schedule)) {
      return false;
    }
    return true;
  }

  onRawClicked(event: EventInfo) {
    this.expandedElement = this.isDetailExpand(event) ? null : event;
  }

  private onMarkerSelected(marker: GeoMarker) {
    const found = this.dataSource.data.find(e => {
      return e.location === marker.location
      && (e.title ? e.title === marker.title : true);
    });
    if (!found) {
      return;
    }
    this.expandEvent(found);
  }

  private expandEvent(event: EventInfo) {
    const position = this.dataSource.data.indexOf(event);
    if (position < 0) {
      return;
    }
    const pageNumber = Math.floor(position / this.paginator.pageSize);
    this.goToPage(pageNumber);
    this.expandedElement = event;
  }

  /**
   * https://github.com/angular/components/issues/7615#issuecomment-358620095
   */
  private goToPage(pageNumber) {
    this.paginator.pageIndex = pageNumber;
    this.paginator.page.next({
         pageIndex: pageNumber,
         pageSize: this.paginator.pageSize,
         length: this.paginator.length
    });
  }
}
