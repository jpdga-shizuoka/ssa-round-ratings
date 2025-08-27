import { Component, ViewChild, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RoundId, RoundInfo } from '../models';
import { RemoteService } from '../remote.service';
import { RoundListDataSource } from './round-list-datasource';

@Component({
    selector: 'app-round-list',
    templateUrl: './round-list.component.html',
    styleUrls: ['./round-list.component.css'],
    imports: [CommonModule, MatTableModule]
})
export class RoundListComponent implements OnInit, AfterViewInit {
  @Input() list!: RoundId[];
  @ViewChild(MatTable) table!: MatTable<RoundInfo>;
  dataSource!: RoundListDataSource;
  displayedColumns = ['title', 'holes', 'hla', 'ssa', 'td'];

  constructor(private remote: RemoteService) {}

  ngOnInit(): void {
    if (!this.list) {
      throw new Error('[list] is required');
    }
    this.dataSource = new RoundListDataSource(this.list, this.remote);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource!;
  }

  is18holes(round: RoundInfo): boolean {
    return round.holes == 18;
  }
}
