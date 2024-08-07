import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { detailExpand } from '../animations';
import { RemoteService } from '../remote.service';
import { EventsTableComponent } from './events-table.component';
import { EventInfo } from './events-datasource';

@Component({
  selector: 'app-monthly-table',
  templateUrl: './monthly-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand]
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
