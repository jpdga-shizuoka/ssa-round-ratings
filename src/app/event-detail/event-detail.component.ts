import { Component, Input, OnInit } from '@angular/core';
import {
  CommonService, EventInfo, LocationInfo, ICONS, MiscInfo
} from '../common.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  @Input() event: EventInfo;

  title: string;
  private location: LocationInfo;
  private miscInfo: MiscInfo[];

  constructor(private cs: CommonService) {
  }

  ngOnInit() {
    this.title = this.cs.getEventTitle(this.event.title);
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

  getPrefecture(): string | undefined {
    const location = this.getLocation();
    if (!location || !location.prefecture) {
      return undefined;
    }
    return this.cs.getPrefecture(location.prefecture);
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
    if (this.event.jpdga) {
      if (this.event.jpdga.eventId) {
        info.push({
          icon: 'public',
          title: 'Papers 🇯🇵',
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
    this.miscInfo = info;
  }
}
