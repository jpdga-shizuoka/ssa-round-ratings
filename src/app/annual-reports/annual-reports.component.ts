import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AnnualReportsDataSource, AnnualReport } from './annual-reports-datasource';
import { RemoteService } from '../remote.service';
import { LocalizePipe } from '../localize.pipe';

@Component({
    selector: 'app-annual-reports',
    templateUrl: './annual-reports.component.html',
    styleUrls: ['./annual-reports.component.css'],
    imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LocalizePipe
]
})
export class AnnualReportsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AnnualReport>;
  dataSource: AnnualReportsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['year', 'title'];

  constructor(
    private readonly remote: RemoteService
  ) {
    this.dataSource = new AnnualReportsDataSource(remote);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
