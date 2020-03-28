import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommonService } from '../common.service';
import { VideoBottomsheetComponent } from '../dialogs/video-bottomsheet.component';
import { VideoInfo } from '../models';
import { isHandset } from '../utilities';

const DISPLAYED_COLUMNS = [['title', 'subttl'], [ 'year', 'title', 'subttl']];

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent implements AfterViewInit, OnInit {
  @Input() dataSource: MatTableDataSource<VideoInfo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isHandset$: Observable<boolean>;

  get displayedColumns$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS[hs ? 0 : 1])
    );
  }

  constructor(
    private cs: CommonService,
    private bottomSheet: MatBottomSheet,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
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

  getTitle(video: VideoInfo): string {
    return this.cs.getEventAliase(video.title);
  }

  private openVideoSheet(video: VideoInfo) {
    const bottomSheetRef = this.bottomSheet.open(VideoBottomsheetComponent, {
      data: video,
    });
  }
}
