import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { VideoBottomsheetComponent } from '../dialogs/video-bottomsheet.component';
import { VideoInfo } from '../models';

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent implements AfterViewInit, OnInit {
  @Input() dataSource: MatTableDataSource<VideoInfo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subttl'];

  constructor(private bottomSheet: MatBottomSheet) {}

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
    console.log('onRawClicked');
    this.openVideoSheet(video);
  }

  private openVideoSheet(video: VideoInfo) {
    const bottomSheetRef = this.bottomSheet.open(VideoBottomsheetComponent, {
      data: video,
      panelClass: 'bottom-sheet-container',
    });
  }
}
