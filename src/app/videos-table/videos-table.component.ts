import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
// import { VideosTableDataSource, VideosTableItem } from './videos-table-datasource';

import { VideoInfo } from '../models';

@Component({
  selector: 'app-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css']
})
export class VideosTableComponent implements AfterViewInit, OnInit {
  @Input() dataSource: MatTableDataSource<VideoInfo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<VideosTableItem>;
  // dataSource: VideosTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'subttl'];

  ngOnInit() {
    // this.dataSource = new VideosTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
