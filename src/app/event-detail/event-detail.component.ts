import { Component, Input, OnInit } from '@angular/core';
import { ICONS, MiscInfo } from '../app-common';
import {
  BreakpointObserver, Observable, isHandset, of as observableOf
} from '../ng-utilities';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';
import { getEventTitle, getPdgaResult, getJpdgaInfo, getLayout, getLiveScore } from '../app-libs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: EventInfo;
  location: LocationInfo;
  miscInfo: MiscInfo[] = [];
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly remote: RemoteService,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.remote.getLocation(this.event.location)
      .subscribe(location => this.location = location);
    this.makePdgaInfo();
    this.makeJpdgaInfo();
    this.makeMiscInfo();
  }

  get title(): string {
    return this.event.title ? getEventTitle(this.event.title) : '';
  }

  get showPastRounds() {
    return this.event.category !== 'local'
        && this.event.category !== 'monthly';
  }

  get showMonthly$() {
    if (this.event.category !== 'monthly') {
      return observableOf(false);
    }
    return this.isHandset$;
  }

  get layout(): string {
    return getLayout(this.event?.layout);
  }

  private makeMiscInfo() {
    if (this.event.urls) {
      for (const urlInfo of this.event.urls) {
        this.miscInfo.push({
          icon: ICONS[urlInfo.type],
          title: urlInfo.title,
          url: urlInfo.url
        });
      }
    }
  }

  private makePdgaInfo() {
    if (this.event.pdga) {
      if (this.event.pdga.eventId) {
        this.pdgaInfo.push({
          icon: 'public',
          title: 'Current Registration',
          url: getPdgaResult(this.event.pdga.eventId)
        });
      }
      if (this.event.pdga?.scoreId) {
        this.pdgaInfo.push({
          icon: 'public',
          title: 'Live Score',
          url: getLiveScore(this.event.pdga.scoreId)
        });
      }
    }
  }

  private makeJpdgaInfo() {
    if (this.event.jpdga) {
      if (this.event.jpdga.eventId) {
        this.jpdgaInfo.push({
          icon: 'public',
          title: 'Paper',
          url: getJpdgaInfo(this.event.jpdga.eventId)
        });
      }
    }
  }
}
