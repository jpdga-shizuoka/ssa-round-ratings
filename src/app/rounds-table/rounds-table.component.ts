import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Observable, Subject, Subscription } from 'rxjs';

import { GeoMarker } from '../map-common';
import { detailExpand } from '../animations';
import { BottomSheetDetailDisabledComponent } from '../dialogs/bottom-sheet-detail-disabled.component';
import { RemoteService, RoundInfo, EventInfo } from '../remote.service';
import { RoundsDataSource } from './rounds-datasource';
import { LocalizeService } from '../localize.service';
import { getEventTitle } from '../app-libs';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  animations: [detailExpand],
})
export class RoundsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() displayedColumns$: Observable<string[]>;
  @Input() markerSelected$: Subject<GeoMarker>;
  @Input() search = '';
  @Input() showMore = false;
  @Input() limit: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RoundsDataSource;
  expandedElement: RoundInfo | null;
  showDetail = false;
  pageSizeOptions = [10, 20, 50, 100];
  private ssMarker: Subscription;
  private ssQuery: Subscription;
  private detailDisabled = false;
  private sorted = false;

  constructor(
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private readonly localize: LocalizeService,
    private readonly remote: RemoteService,
  ) { }

  ngOnInit() {
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

    this.dataSource = new RoundsDataSource(this.remote, this.localize, this.limit);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ssQuery?.unsubscribe();
    this.ssMarker?.unsubscribe();
  }

  onEventSlected(location: string) {
    this.applyFilter(location);
  }

  onRawClicked(round: RoundInfo) {
    if (this.detailDisabled) {
      this.bottomSheet.open(BottomSheetDetailDisabledComponent);
      return;
    }
    this.expandedElement = this.isDetailExpand(round) ? null : round;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.detailDisabled = this.sorted;
    this.search = filterValue;
  }

  get loading() { return this.dataSource.loading; }
  get isMinimum() { return this.limit <= this.pageSizeOptions[0]; }
  get showHistory() {
    if (!this.expandedElement) {
      return false;
    }
    if (!this.search) {
      return true;
    }
    const title = getEventTitle(this.expandedElement.event);
    if (this.search.includes(title)
    ||  this.search.includes(this.localize.transform(title))) {
      return false;
    }
    return true;
  }

  isCanceled(round: RoundInfo) {
    return round.round === 'CANCELED';
  }

  isDetailExpand(round: RoundInfo) {
    if (!this.expandedElement) {
      return false;
    }
    if (this.expandedElement.event !== round.event) {
      return false;
    }
    if (this.expandedElement.round !== round.round) {
      return false;
    }
    return true;
  }

  getRawClass(round: RoundInfo) {
    return {
      canceled: this.isCanceled(round),
      'round-element-row': true,
      'round-expanded-row': this.isDetailExpand(round)
    };
  }

  getLength(round: RoundInfo) {
    return round.hla ? round.hla + 'm' : '';
  }

  getYear(time: string) {
    const date = new Date(time);
    return date.getFullYear();
  }

  private updateSearch(query?: string) {
    if (!query) {
      return;
    }
    this.dataSource.filter = query;
    this.search = query;
    this.expandedElement = null;
    this.showDetail = false;
  }
}
