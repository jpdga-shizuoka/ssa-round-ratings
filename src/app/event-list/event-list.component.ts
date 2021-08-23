import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { EventInfo } from '../models';
import { RemoteService } from '../remote.service';
import { EventListDataSource } from './event-list-datasource';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() key$!: Observable<EventInfo>;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  dataSource?: EventListDataSource;
  displayedColumns = ['date', 'title'];
  private pendingViewInit = false;
  private subscription?: Subscription;

  constructor(
    private router: Router,
    private remote: RemoteService
  ) { }

  ngOnInit(): void {
    this.subscription = this.key$.subscribe(event => {
      this.dataSource = new EventListDataSource(event, this.remote);
      if (this.pendingViewInit) {
        this.table.dataSource = this.dataSource!;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.table) {
      this.table.dataSource = this.dataSource!;
    } else {
      this.pendingViewInit = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onRawClicked(event: EventInfo): void {
    this.router.navigate(['/event', event.id]);
  }

  isCanceled(event: EventInfo): boolean {
    return event.status === 'CANCELED';
  }
}
