import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { detailExpand } from '../animations';
import { RemoteService } from '../remote.service';
import { EventsTableComponent } from './events-table.component';
import { EventInfo } from './events-datasource';

@Component({
  selector: 'app-local-table',
  templateUrl: './local-table.component.html',
  styleUrls: ['./events-table.component.css'],
  animations: [detailExpand]
})
export class LocalTableComponent extends EventsTableComponent {
  constructor(
    route: ActivatedRoute,
    router: Router,
    remote: RemoteService
  ) {
    super(route, router, remote);
  }

  onRawClicked(event: EventInfo) {
    this.expandedElement = this.isDetailExpand(event) ? undefined : event;
  }

  isCanceled(event: EventInfo): boolean {
    return event.status === 'CANCELED';
  }
}
