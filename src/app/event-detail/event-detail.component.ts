import { Component, Input } from '@angular/core';

import {
  CommonService, EventInfo, LocationInfo, ICONS, MiscInfo
} from '../common.service';
import {
  BreakpointObserver, Observable, isHandset, of as observableOf
} from '../utilities';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {

  @Input() event: EventInfo;

  private _location: LocationInfo;
  private _miscInfo: MiscInfo[];
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get title(): string {
    return this.event.title ? this.cs.getEventTitle(this.event.title) : '';
  }

  get monthlySchedule() {
    return this.cs.getMonth(this.event.schedule);
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

  get miscInfo(): MiscInfo[] {
    if (this._miscInfo) {
      return this._miscInfo;
    }
    this.makeMiscInfo();
    return this._miscInfo;
  }

  get location(): string | undefined {
    const name = this.cs.getLocationName(this.event.location);
    const region = this.getRegion();
    return `${name}, ${region}`;
  }

  get geolocation(): string | undefined {
    const location = this.getLocation();
    if (!location || !location.geolocation) {
      return undefined;
    }
    return this.cs.getGeolocation(location.geolocation);
  }

  get pastResults() {
    return this.cs.getMenuAliase('Past Results');
  }

  get seeThePastResults() {
    return this.cs.getMenuAliase('See the Past Results');
  }

  private getRegion(): string | undefined {
    const location = this.getLocation();
    if (!location || !location.prefecture) {
      return undefined;
    }
    return this.cs.getPrefecture(location.prefecture);
  }

  private getLocation(): LocationInfo | undefined {
    if (this._location) {
      return this._location;
    }
    this._location = this.cs.getLocation(this.event.location);
    return this._location;
  }

  private makeMiscInfo() {
    const info: MiscInfo[] = [];
    if (this.event.pdga) {
      if (this.event.pdga.eventId) {
        info.push({
          icon: 'public',
          title: 'PDGA 🇺🇸',
          url: this.cs.getPdgaResult(this.event.pdga.eventId)
        });
      }
    }
    if (this.event.jpdga) {
      if (this.event.jpdga.eventId) {
        info.push({
          icon: 'public',
          title: 'JPDGA 🇯🇵',
          url: this.cs.getJpdgaInfo(this.event.jpdga.eventId)
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
    this._miscInfo = info;
  }
}
