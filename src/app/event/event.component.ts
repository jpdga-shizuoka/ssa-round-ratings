import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { RemoteService, EventId, EventInfo, LocationInfo } from '../remote.service';
import { getCbjUrl, makePdgaInfo, makePdga2nd, makeJpdgaInfo, makeMiscInfo, makeVideoInfo, makePhotoInfo, getStarsOfPurse } from '../libs';
import { MiscInfo } from '../app-common';
import { RoundId, Layouts } from '../models';
import { LocalizePipe } from '../localize.pipe';
import { PeriodPipe } from '../period.pipe';
import { GeolinkPipe } from '../geolink.pipe';
import { IcalenderComponent } from '../icalendar/icalendar.component';
import { RoundListComponent } from '../round-list/round-list.component';
import { VideoListComponent } from '../video-list/video-list.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { EventListComponent } from '../event-list/event-list.component';
import { DifficultyChartComponent } from '../difficulty-chart/difficulty-chart.component';

function getTotalPlayers(event: EventInfo): number {
  if (event.players) {
    return event.players.pro
      + event.players.ama
      + event.players.misc;
  }
  return 0;
}

interface LayoutUrl {
  title: string;
  url: string;
}

function layout2layouts(layout?: Layouts) {
  const urls: LayoutUrl[] = [];
  if (layout?.official) {
    urls.push({
      title: 'Official Map',
      url: layout.official
    });
  }
  if (layout?.back) {
    urls.push({
      title: 'Back tee',
      url: layout.back
    });
  }
  if (layout?.front) {
    urls.push({
      title: 'Front tee',
      url: layout.front
    });
  }
  if (layout?.ama) {
    urls.push({
      title: 'Ama tee',
      url: layout.ama
    });
  }
  if (layout?.cbj) {
    urls.push({
      title: 'Caddie Book Japan',
      url: getCbjUrl(layout.cbj)
    });
  }
  return urls;
}

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    imports: [
        CommonModule,
        LocalizePipe,
        PeriodPipe,
        GeolinkPipe,
        IcalenderComponent,
        RoundListComponent,
        VideoListComponent,
        PhotoListComponent,
        EventListComponent,
        DifficultyChartComponent
    ]
})
export class EventComponent implements OnInit, OnDestroy {
  eventId?: EventId;
  event$?: Subject<EventInfo>;
  roundList$?: Subject<RoundId[]>;
  location$?: Observable<LocationInfo>;
  pdgaInfo: MiscInfo[] = [];
  pdga2nd: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];
  photoInfo: MiscInfo[] = [];
  layouts: LayoutUrl[] = [];
  totalPlayers?: number;
  canceled = false;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private remote: RemoteService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.eventId = params['eventId'] as EventId;
      if (this.eventId) {
        this.event$ = new Subject<EventInfo>();
        this.roundList$ = new Subject<RoundId[]>();
        this.remote.getEvent(this.eventId, 'alltime').pipe(
          tap(event => {
            this.location$ = this.remote.getLocation(event.location).pipe(first());
            this.pdgaInfo = makePdgaInfo(event);
            this.pdga2nd = makePdga2nd(event);
            this.jpdgaInfo = makeJpdgaInfo(event);
            this.miscInfo = makeMiscInfo(event);
            this.videoInfo = makeVideoInfo(event);
            this.photoInfo = makePhotoInfo(event);
            this.totalPlayers = getTotalPlayers(event);
            this.layouts = layout2layouts(event.layout);
            this.canceled = event.status === 'CANCELED';
          })
        ).subscribe(event => {
          this.event$?.next(event);
          this.event$?.complete();
          if (event.rounds) {
            this.roundList$?.next(event.rounds);
            this.roundList$?.complete();  
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showCalendar(event: EventInfo): boolean {
    if (!event.period?.to) {
      return false;
    }
    const nextDay = new Date(event.period.to);
    nextDay.setDate(nextDay.getDate() + 1);
    return new Date().getTime() < nextDay.getTime();
  }

  getStars(event: EventInfo): string {
    if (!event.budget?.purse) {
      return '';
    }
    let starCount = getStarsOfPurse(event.budget);
    let stars = '\u{2605}'.repeat(starCount);
    return stars;
  }

  roundUnderThousand(n?: number): number {
    if (!n) {
      return 0;
    }
    return Math.round(n / 1000) * 1000;
  }
}
