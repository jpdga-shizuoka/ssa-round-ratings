import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { detailExpand } from '../animations';
import { RemoteService } from '../remote.service';
import { EventsTableComponent } from './events-table.component';
import { EventInfo } from './events-datasource';
import { LocalizePipe } from '../localize.pipe';
import { LocationPipe } from '../location.pipe';
import { SchedulePipe } from '../schedule.pipe';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
    selector: 'app-monthly-table',
    templateUrl: './monthly-table.component.html',
    styleUrls: ['./events-table.component.css'],
    animations: [detailExpand],
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        LocalizePipe,
        LocationPipe,
        SchedulePipe,
        EventDetailComponent
    ]
})
export class MonthlyTableComponent extends EventsTableComponent {
  constructor(
    route: ActivatedRoute,
    router: Router,
    remote: RemoteService
  ) {
    super(route, router, remote);
  }

  override onRawClicked(event: EventInfo) {
    this.expandedElement = this.isDetailExpand(event) ? undefined : event;
  }
}
