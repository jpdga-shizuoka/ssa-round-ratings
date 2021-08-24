import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { RemoteService, EventId, EventInfo, LocationInfo } from '../remote.service';
import { getLayout, makePdgaInfo, makeJpdgaInfo, makeMiscInfo, makeVideoInfo } from '../libs';
import { MiscInfo } from '../app-common';
import { RoundId } from '../models';

function getTotalPlayers(event: EventInfo): number {
  if (event.players) {
    return event.players.pro
      + event.players.ama
      + event.players.misc;
  }
  return 0;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  eventId?: EventId;
  event$?: Subject<EventInfo>;
  roundList$?: Subject<RoundId[]>;
  location$?: Observable<LocationInfo>;
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];
  totalPlayers?: number;
  layout?: string;
  canceled = false;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private remote: RemoteService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.eventId = params.eventId as EventId;
      if (this.eventId) {
        this.event$ = new Subject<EventInfo>();
        this.roundList$ = new Subject<RoundId[]>();
        this.remote.getEvent(this.eventId, 'alltime').pipe(
          tap(event => {
            this.location$ = this.remote.getLocation(event.location).pipe(first());
            this.pdgaInfo = makePdgaInfo(event);
            this.jpdgaInfo = makeJpdgaInfo(event);
            this.miscInfo = makeMiscInfo(event);
            this.videoInfo = makeVideoInfo(event);
            this.totalPlayers = getTotalPlayers(event);
            this.layout = getLayout(event.layout);
            this.canceled = event.status === 'CANCELED';
          })
        ).subscribe(event => {
          this.event$?.next(event);
          this.event$?.complete();
          this.roundList$?.next(event.rounds);
          this.roundList$?.complete();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
