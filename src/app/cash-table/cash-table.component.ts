import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, PercentPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CashTableDataSource } from './cash-table-datasource';
import { EventInfo } from '../models';
import { LocalizePipe } from '../localize.pipe';
import { RoundThousandsPipe } from '../round-thousands.pipe';

@Component({
  selector: 'app-cash-table',
  templateUrl: './cash-table.component.html',
  styleUrl: './cash-table.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule, MatIconModule, FormsModule,　MatInputModule,
    MatTableModule, MatPaginatorModule, MatSortModule, CurrencyPipe, PercentPipe, LocalizePipe, RoundThousandsPipe
  ]
})
export class CashTableComponent implements AfterViewInit {
  private router = inject(Router);
  @Input() limit?: number;
  @Input() search = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  dataSource = new CashTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'purse', 'payout', 'cashing'];
  pageSizeOptions = [30, 60, 120];

  get loading(): boolean { return this.dataSource.loading; }
  get isMinimum(): boolean { return !!this.limit && this.limit <= this.pageSizeOptions[0]; }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'purse':
          return item.budget?.totalprize ?? 0;
        case 'payout':
          return item.budget?.prizeratio ?? 0;
        case 'cashing':
          return item.budget?.paidratio ?? 0;
        default: {
          const t = item as unknown as {[ property: string ]: string | number | undefined};
          return t[property] ?? '';
        }
      }
    };
    this.table.dataSource = this.dataSource;
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
}
