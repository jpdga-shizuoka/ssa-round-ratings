import { Component, Input, OnInit } from '@angular/core';
import { ICONS, MiscInfo } from '../app-common';
import {
  BreakpointObserver, Observable, isHandset, of as observableOf
} from '../ng-utilities';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';
import { getEventTitle, getPdgaResult, getJpdgaInfo } from '../app-libs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: EventInfo;
  location: LocationInfo;
  miscInfo: MiscInfo[];
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

  private makeMiscInfo() {
    const info: MiscInfo[] = [];
    if (this.event.pdga) {
      if (this.event.pdga.eventId) {
        info.push({
          icon: 'public',
          title: '🇺🇸PDGA',
          url: getPdgaResult(this.event.pdga.eventId)
        });
      }
    }
    if (this.event.jpdga) {
      if (this.event.jpdga.eventId) {
        info.push({
          icon: 'public',
          title: '🇯🇵JPDGA',
          url: getJpdgaInfo(this.event.jpdga.eventId)
        });
      }
    }
    if (this.event.urls) {
      for (const urlInfo of this.event.urls) {
        info.push({
          icon: ICONS[urlInfo.type],
          title: urlInfo.title,
          url: urlInfo.url
        });
      }
    }
    this.miscInfo = info;
  }
}
