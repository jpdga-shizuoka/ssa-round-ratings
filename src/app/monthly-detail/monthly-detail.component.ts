import { Component, OnInit, Input } from '@angular/core';

import {
  CommonService, EventInfo, LocationInfo, MiscInfo, ICONS
} from '../common.service';
import { BreakpointObserver, Observable, isHandset } from '../utilities';

@Component({
  selector: 'app-monthly-detail',
  templateUrl: './monthly-detail.component.html',
  styleUrls: ['./monthly-detail.component.css']
})
export class MonthlyDetailComponent implements OnInit {

  @Input() event: EventInfo;
  private location: LocationInfo;
  private miscInfo: MiscInfo[];
  isHandset$: Observable<boolean>;

  get monthlySchedule() {
    return this.cs.getMonth(this.event.schedule);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.makeMiscInfo();
  }

  getMiscInfo(): MiscInfo[] {
    return this.miscInfo;
  }

  getLocationName(): string | undefined {
    return this.cs.getLocationName(this.event.location);
  }

  getGeolocation(): string | undefined {
    const location = this.getLocation();
    if (!location || !location.geolocation) {
      return undefined;
    }
    return this.cs.getGeolocation(location.geolocation);
  }

  private getLocation(): LocationInfo | undefined {
    if (this.location) {
      return this.location;
    }
    this.location = this.cs.getLocation(this.event.location);
    return this.location;
  }

  private makeMiscInfo() {
    const info: MiscInfo[] = [];
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
