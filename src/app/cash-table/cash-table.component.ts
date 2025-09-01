import { AfterViewInit, Component, ViewChild, inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CurrencyPipe, PercentPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { Observable, Subscription } from 'rxjs';
import { CashTableDataSource } from './cash-table-datasource';
import { EventInfo } from '../models';
import { LocalizePipe } from '../localize.pipe';
import { RoundThousandsPipe } from '../round-thousands.pipe';
import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';

@Component({
  selector: 'app-cash-table',
  templateUrl: './cash-table.component.html',
  styleUrl: './cash-table.component.css',
  imports: [
    CommonModule, RouterModule,
    MatFormFieldModule, MatIconModule, FormsModule, MatInputModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, MatSortModule, CurrencyPipe, PercentPipe, LocalizePipe, RoundThousandsPipe
  ]
})
export class CashTableComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private remote = inject(RemoteService);
  private localize = inject(LocalizeService);
  private subscription?: Subscription;
  @Input() limit?: number;
  @Input() search = '';
  @Input() showMore = false;
  @Input() displayedColumns$!: Observable<string[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  dataSource?: CashTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  pageSizeOptions = [30, 60, 120];

  get loading(): boolean { return this.dataSource?.loading ?? true; }
  get isMinimum(): boolean { return !!this.limit && this.limit <= this.pageSizeOptions[0]; }

  ngOnInit(): void {
    this.dataSource = new CashTableDataSource(this.remote, this.localize, this.limit);

    if (!this.displayedColumns$) {
      throw new Error('[displayedColumns$] is required');
    }
    this.subscription = this.route.queryParams.subscribe(params => {
      this.updateSearch(params['location']);
    });
  }

  ngAfterViewInit(): void {
    if (!this.dataSource) {
      return;
    }
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
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search = filterValue;
  }

  private updateSearch(query?: string) {
    if (!this.dataSource) {
      return;
    }
    if (!query) {
      return;
    }
    this.dataSource.filter = query;
    this.search = query;
  }
}
