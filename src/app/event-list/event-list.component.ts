import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';

import { EventInfo } from '../models';
import { RemoteService } from '../remote.service';
import { EventListDataSource } from './event-list-datasource';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input() key$!: Observable<EventInfo>;
  @ViewChild(MatTable) table!: MatTable<EventInfo>;
  dataSource?: EventListDataSource;
  displayedColumns = ['date', 'title'];

  constructor(
    private router: Router,
    private remote: RemoteService
  ) { }

  ngOnInit(): void {
    this.key$.subscribe(event => {
      this.dataSource = new EventListDataSource(event, this.remote);
      this.table.dataSource = this.dataSource!;
    });
  }

  onRawClicked(event: EventInfo): void {
    this.router.navigate(['/event', event.id]);
  }

  isCanceled(event: EventInfo): boolean {
    return event.status === 'CANCELED';
  }
}
