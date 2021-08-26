import {
  Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';

import { EventCategory } from '../models';
import { RemoteService } from '../remote.service';
import { EventsDataSource, EventInfo } from './events-datasource';
import { title2name } from '../libs';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() category!: EventCategory;
  @Input() showMore = false;
  @Input() limit?: number;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = '';
  dataSource!: EventsDataSource;
  expandedElement?: EventInfo;
  pageSizeOptions = [10, 20, 50, 100];
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly remote: RemoteService
  ) { }

  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.remote, this.category, this.limit);

    if (!this.displayedColumns$) {
      throw new Error('[displayedColumns$] is required');
    }
    if (!this.category) {
      throw new Error('[category] is required');
    }
    this.subscription = this.route.queryParams.subscribe(params => {
      this.updateSearch(params.location);
    });
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

  get link(): string {
    switch (this.category) {
      case 'upcoming':
        return '/schedule/events';
      case 'local':
        return '/local/events';
      default:
        return '/past/events';
    }
  }

  isCanceled(event: EventInfo): boolean {
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

  onRawClicked(event: EventInfo): void {
    this.router.navigate(['/event', event.id]);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search = filterValue;
  }

  private updateSearch(query?: string) {
    if (!query) {
      return;
    }
    this.dataSource.filter = query;
    this.search = query;
  }
}
