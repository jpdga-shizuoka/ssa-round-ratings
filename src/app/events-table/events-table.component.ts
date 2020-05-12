import {
  Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, Subscription } from 'rxjs';

import { GeoMarker } from '../map-common';
import { EventCategory } from '../models';
import { detailExpand } from '../animations';
import { RemoteService } from '../remote.service';
import { EventsDataSource, EventInfo } from './events-datasource';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand],
})
export class EventsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() displayedColumns$: Observable<string[]>;
  @Input() markerSelected$: Subject<GeoMarker>;
  @Input() category: EventCategory;
  @Input() showMore = false;
  @Input() limit: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: EventsDataSource;
  expandedElement: EventInfo | null;
  showDetail = false;
  pageSizeOptions = [10, 20, 50, 100];
  private subscription: Subscription;

  constructor(private readonly remote: RemoteService) { }

  ngOnInit() {
    this.dataSource = new EventsDataSource(this.remote, this.category, this.limit);
    if (this.markerSelected$) {
      this.subscription = this.markerSelected$.subscribe({
        next: marker => this.onMarkerSelected(marker)
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get isMinimum(): boolean {
    return this.showMore && this.limit <= this.pageSizeOptions[0];
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
