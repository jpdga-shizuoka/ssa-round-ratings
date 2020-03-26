import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { detailExpand } from '../animations';

import { VideoInfo } from '../models';

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
  animations: [detailExpand],
})
export class VideosTableComponent implements AfterViewInit, OnInit {
  @Input() dataSource: MatTableDataSource<VideoInfo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: VideoInfo | null = null;
  showDetail = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subttl'];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  showView(video: VideoInfo): boolean {
    return this.showDetail || this.expandedElement;
  }

  isDetailExpand(video: VideoInfo): boolean {
    return this.expandedElement === video;
  }

  onRawClicked(video: VideoInfo) {
    this.expandedElement = this.isDetailExpand(video) ? null : video;
  }
}
