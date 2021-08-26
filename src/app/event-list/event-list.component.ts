import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';

import { EventInfo } from '../models';
import { RemoteService } from '../remote.service';
import { EventListDataSource } from './event-list-datasource';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {
  @Input() event!: EventInfo;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  dataSource?: EventListDataSource;
  displayedColumns = ['date', 'title'];
  private pendingViewInit = false;

  constructor(
    private router: Router,
    private remote: RemoteService
  ) { }

  ngOnInit(): void {
    if (!this.event) {
      throw new Error('[event] is required');
    }
    this.dataSource = new EventListDataSource(this.event, this.remote);
    if (this.pendingViewInit) {
      this.table.dataSource = this.dataSource!;
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.table) {
      this.table.dataSource = this.dataSource!;
    } else {
      this.pendingViewInit = true;
    }
  }

  onRawClicked(event: EventInfo): void {
    this.router.navigate(['/event', event.id]);
  }

  isCanceled(event: EventInfo): boolean {
    return event.status === 'CANCELED';
  }
}
