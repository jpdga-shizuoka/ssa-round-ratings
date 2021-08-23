import { Component, ViewChild, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { RoundId, RoundInfo } from '../models';
import { RemoteService } from '../remote.service';
import { RoundListDataSource } from './round-list-datasource';

@Component({
  selector: 'app-round-list',
  templateUrl: './round-list.component.html',
  styleUrls: ['./round-list.component.css']
})
export class RoundListComponent implements OnDestroy, AfterViewInit {
  @Input() list$!: Observable<RoundId[]>;
  @ViewChild(MatTable) table!: MatTable<RoundInfo>;
  dataSource?: RoundListDataSource;
  displayedColumns = ['title', 'holes', 'hla', 'ssa', 'td'];
  private subscription?: Subscription;

  constructor(private remote: RemoteService) {}

  ngAfterViewInit() {
    this.subscription = this.list$.subscribe(list => {
      this.dataSource = new RoundListDataSource(list, this.remote);
      this.table.dataSource = this.dataSource!;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
