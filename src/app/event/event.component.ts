import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

import { RemoteService, EventId, EventInfo, LocationInfo } from '../remote.service';
import { getLayout, makePdgaInfo, makeJpdgaInfo, makeMiscInfo, makeVideoInfo } from '../libs';
import { MiscInfo } from '../app-common';
import { RoundId } from '../models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId?: EventId;
  event?: EventInfo;
  event$ = new Subject<EventInfo>();
  roundList$ = new Subject<RoundId[]>();
  location$?: Observable<LocationInfo>;
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private remote: RemoteService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params.eventId as EventId;
      if (this.eventId) {
        this.remote.getEvent(this.eventId, 'alltime').pipe(
          first(),
          tap(event => {
            this.location$ = this.remote.getLocation(event.location).pipe(first());
            this.pdgaInfo = makePdgaInfo(event);
            this.jpdgaInfo = makeJpdgaInfo(event);
            this.miscInfo = makeMiscInfo(event);
            this.videoInfo = makeVideoInfo(event);
          })
        ).subscribe(event => {
          this.event = event;
          this.event$.next(event);
          // this.event$.complete();
          this.roundList$.next(event.rounds);
          // this.roundList$.complete();
        });
      }
    });
  }

  get layout(): string | undefined {
    return getLayout(this.event?.layout);
  }

  get totalPlayers(): number {
    if (this.event?.players) {
      return this.event.players.pro
        + this.event.players.ama
        + this.event.players.misc;
    }
    return 0;
  }

  get showRoundsStat(): number | undefined {
    return this.event?.rounds?.length;
  }

  get showDifficultyChart$(): Observable<boolean> {
    return this.roundList$.pipe(
      map(list => list?.length > 0)
    )
  }
}
