import {
  Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, Subscription } from 'rxjs';

import { GeoMarker } from '../map-common';
import { EventCategory } from '../models';
import { detailExpand } from '../animations';
import { RemoteService } from '../remote.service';
import { LocationService } from '../location.service';
import { EventsDataSource, EventInfo } from './events-datasource';
import { title2name } from '../libs';

interface ExpandedRow {
  canceled: boolean;
  'event-element-row': boolean;
  'event-expanded-row': boolean;
}

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand]
})
export class EventsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() markerSelected$!: Subject<GeoMarker>;
  @Input() category!: EventCategory;
  @Input() showMore = false;
  @Input() limit?: number;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: EventsDataSource;
  expandedElement?: EventInfo;
  showDetail = false;
  pageSizeOptions = [10, 20, 50, 100];
  private subscription?: Subscription;

  constructor(
    private readonly remote: RemoteService,
    private location: LocationService
  ) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.remote, this.category, this.limit);

    if (!this.displayedColumns$) {
      throw new Error('[displayedColumns$] is required');
    }
    if (!this.category) {
      throw new Error('[category] is required');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title':
          return title2name(item.title);
        case 'date':
          return item.period?.from ?? '';
        default: {
          const t = item as unknown as { [property: string]: string | number };
          return t[property];
        }
      }
    };
    this.table.dataSource = this.dataSource;
    if (this.markerSelected$) {
      this.subscription = this.markerSelected$.subscribe(
        marker => this.onMarkerSelected(this.dataSource, marker)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get pageSize(): number {
    return this.category === 'monthly' ? this.pageSizeOptions[1] : this.pageSizeOptions[0];
  }

  get loading(): boolean { return this.dataSource?.loading ?? true; }
  get isMinimum(): boolean {
    return this.showMore && !!this.limit && this.limit <= this.pageSizeOptions[0];
  }

  getRawClass(event: EventInfo): ExpandedRow {
    return {
      canceled: this.isCanceled(event),
      'event-element-row': true,
      'event-expanded-row': this.isDetailExpand(event)
    };
  }

  isCanceled(event: EventInfo): boolean {
    return event.status === 'CANCELED';
  }

  isDetailExpand(event: EventInfo): boolean {
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

  onRawClicked(event: EventInfo): void {
    this.expandedElement = this.isDetailExpand(event) ? undefined : event;
  }

  private onMarkerSelected(dataSource: EventsDataSource, marker: GeoMarker): void {
    const found = dataSource.data.find(e => {
      return e.location === marker.location
      && (e.title ? e.title === marker.title : true);
    });
    if (!found) {
      return;
    }
    this.expandEvent(dataSource, found);
  }

  private expandEvent(dataSource: EventsDataSource, event: EventInfo): void {
    const position = dataSource.data.indexOf(event);
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
  private goToPage(pageNumber: number): void {
    this.paginator.pageIndex = pageNumber;
    this.paginator.page.next({
      pageIndex: pageNumber,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }
}
