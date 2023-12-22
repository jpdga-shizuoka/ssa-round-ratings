import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ScriptLoaderService } from '../script-loader.service';
import { VideoBottomsheetComponent } from '../dialogs/video-bottomsheet.component';
import { VideoInfo } from '../models';
import { isHandset } from '../ng-utilities';
import { VideosDataSource } from './videos-datasource';
import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';

const DISPLAYED_COLUMNS = [['title', 'subttl'], ['year', 'title', 'subttl']];

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css']
})
export class VideosTableComponent implements OnInit, AfterViewInit {
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() showSearch = true;
  @Input() showMore = false;
  @Input() search = '';
  @Input() limit = 0;
  @Input() keyword?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly isHandset$: Observable<boolean>;
  dataSource!: VideosDataSource;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[hs ? 0 : 1])
    );
  }

  constructor(
    private scriptLoader: ScriptLoaderService,
    private bottomSheet: MatBottomSheet,
    private readonly remote: RemoteService,
    private readonly localize: LocalizeService,
    breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get loading(): boolean { return this.dataSource?.loading ?? true; }
  get isMinimum(): boolean {
    return this.showMore && this.limit <= this.pageSizeOptions[0];
  }

  ngOnInit(): void {
    this.dataSource
      = new VideosDataSource(this.remote, this.localize, this.limit, this.keyword);
    this.scriptLoader.youtube();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onRawClicked(video: VideoInfo): void {
    this.openVideoSheet(video);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search = filterValue;
  }

  private openVideoSheet(video: VideoInfo) {
    this.bottomSheet.open(VideoBottomsheetComponent, {
      data: video
    });
  }
}
