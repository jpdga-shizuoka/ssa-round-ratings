import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { RemoteService, EventId, EventInfo, LocationInfo } from '../remote.service';
import { getEventTitle, getLayout, makePdgaInfo, makeJpdgaInfo, makeMiscInfo, makeVideoInfo } from '../app-libs';
import { MiscInfo } from '../app-common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  eventId?: EventId;
  event?: EventInfo;
  location$?: Observable<LocationInfo>;
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];

  constructor(
    route: ActivatedRoute,
    private remote: RemoteService
  ) {
    route.params.subscribe(params => {
      this.eventId = params.eventId as EventId;
      if (this.eventId) {
        remote.getEvent(this.eventId, 'past').pipe(
          first(),
          tap(event => {
            this.location$ = this.remote.getLocation(event.location).pipe(first());
            this.pdgaInfo = makePdgaInfo(event);
            this.jpdgaInfo = makeJpdgaInfo(event);
            this.miscInfo = makeMiscInfo(event);
            this.videoInfo = makeVideoInfo(event);
          })
        ).subscribe(event => { this.event = event; });
      }
    });
  }

  get title(): string {
    return this.event?.title ? getEventTitle(this.event.title) : '';
  }

  get layout(): string | undefined {
    return getLayout(this.event?.layout);
  }
}
