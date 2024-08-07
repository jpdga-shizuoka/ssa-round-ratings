import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable, Subject, Subscription } from 'rxjs';

import { GeoMarker } from '../map-common';
import { detailExpand } from '../animations';
import { BottomSheetDetailDisabledComponent } from '../dialogs/bottom-sheet-detail-disabled.component';
import { RemoteService, RoundInfo } from '../remote.service';
import { RoundsDataSource } from './rounds-datasource';
import { LocalizeService } from '../localize.service';
import { getEventTitle, title2name } from '../libs';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  animations: [detailExpand]
})
export class RoundsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() markerSelected$!: Subject<GeoMarker>;
  @Input() search = '';
  @Input() showMore = false;
  @Input() limit?: number;
  @ViewChild(MatTable) table!: MatTable<RoundInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: RoundsDataSource;
  expandedElement?: RoundInfo;
  showDetail = false;
  pageSizeOptions = [30, 60, 120];
  private ssMarker?: Subscription;
  private ssQuery?: Subscription;
  private detailDisabled = false;
  private sorted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private readonly localize: LocalizeService,
    private readonly remote: RemoteService
  ) { }

  ngOnInit(): void {
    this.dataSource = new RoundsDataSource(this.remote, this.localize, this.limit);

    if (!this.displayedColumns$) {
      throw new Error('[displayedColumns$] is required');
    }
    if (this.route.snapshot.queryParamMap.has('search')) {
      const filter = this.route.snapshot.queryParamMap.get('search');
      this.updateSearch(filter);
    }
    if (this.markerSelected$) {
      this.ssMarker = this.markerSelected$.subscribe({
        next: marker => {
          const locationName = this.localize.transform(marker.location, 'location');
          this.applyFilter(locationName);
        }
      });
    }
    this.ssQuery = this.route.queryParams
      .subscribe(query => this.updateSearch(query.search));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'year':
          return item.date;
        case 'event':
          return title2name(item.eventTitle);
        case 'td':
          return item.difficulty ?? 0;
        default: {
          const t = item as unknown as {[ property: string ]: string | number};
          return t[property];
        }
      }
    };
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.ssQuery?.unsubscribe();
    this.ssMarker?.unsubscribe();
  }

  onEventSlected(location: string): void {
    this.applyFilter(location);
  }

  onRawClicked(round: RoundInfo): void {
    if (this.detailDisabled) {
      this.bottomSheet.open(BottomSheetDetailDisabledComponent);
      return;
    }
    this.router.navigate(['/event', round.event]);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.detailDisabled = this.sorted;
    this.search = filterValue;
  }

  get loading(): boolean { return this.dataSource.loading; }
  get isMinimum(): boolean { return !!this.limit && this.limit <= this.pageSizeOptions[0]; }
  get showHistory(): boolean {
    if (!this.expandedElement) {
      return false;
    }
    if (!this.search) {
      return true;
    }
    const title = getEventTitle(this.expandedElement.event);
    if (this.search.includes(title)
    || this.search.includes(this.localize.transform(title))) {
      return false;
    }
    return true;
  }

  isCanceled(round: RoundInfo): boolean {
    return round.round === 'CANCELED';
  }

  getLength(round: RoundInfo): string {
    return round.hla ? `${round.hla}m` : '';
  }

  getYear(time: string): number {
    const date = new Date(time);
    return date.getFullYear();
  }

  private updateSearch(query?: string | null) {
    if (!query) {
      return;
    }
    this.dataSource.filter = query;
    this.search = query;
    this.expandedElement = undefined;
    this.showDetail = false;
  }
}
