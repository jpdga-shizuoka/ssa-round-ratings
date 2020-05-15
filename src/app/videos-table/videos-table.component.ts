import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VideoBottomsheetComponent } from '../dialogs/video-bottomsheet.component';
import { VideoInfo } from '../models';
import { isHandset } from '../ng-utilities';
import { VideosDataSource } from './videos-datasource';
import { RemoteService, EventCategory } from '../remote.service';
import { LocalizeService } from '../localize.service';

const DISPLAYED_COLUMNS = [['title', 'subttl'], [ 'year', 'title', 'subttl']];

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent implements AfterViewInit, OnInit {
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() showSearch = true;
  @Input() showMore = false;
  @Input() search = '';
  @Input() category = 'video' as EventCategory;
  @Input() limit?: number;
  @Input() keyword?: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly isHandset$: Observable<boolean>;
  dataSource: VideosDataSource;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[hs ? 0 : 1])
    );
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private readonly remote: RemoteService,
    private readonly localize: LocalizeService,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get loading() {return this.dataSource.loading;}
  get isMinimum(): boolean {
    return this.showMore && this.limit <= this.pageSizeOptions[0];
  }

  ngOnInit() {
    this.dataSource
      = new VideosDataSource(this.remote, this.localize, this.category, this.limit, this.keyword);

    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onRawClicked(video: VideoInfo) {
    this.openVideoSheet(video);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search = filterValue;
  }

  private openVideoSheet(video: VideoInfo) {
    const bottomSheetRef = this.bottomSheet.open(VideoBottomsheetComponent, {
      data: video,
    });
  }
}
