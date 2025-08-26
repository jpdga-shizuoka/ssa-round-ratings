import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MiscInfo } from '../app-common';
import {
  BreakpointObserver, Observable, isHandset, of as observableOf
} from '../ng-utilities';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';
import { getEventTitle, makeMiscInfo } from '../libs';
import { LocalizePipe } from '../localize.pipe';
import { GeolinkPipe } from '../geolink.pipe';
import { SchedulePipe } from '../schedule.pipe';
import { IcalenderComponent } from '../icalendar/icalendar.component';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css'],
    imports: [
        CommonModule,
        MatIconModule,
        LocalizePipe,
        GeolinkPipe,
        SchedulePipe,
        IcalenderComponent
    ]
})
export class EventDetailComponent implements OnInit {
  @Input() event!: EventInfo;
  location$?: Observable<LocationInfo>;
  miscInfo: MiscInfo[] = [];
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private remote: RemoteService
  ) {
    this.isHandset$ = isHandset(this.breakpointObserver);
  }

  ngOnInit(): void {
    if (!this.event) {
      throw new Error('[event] is required');
    }
    this.location$ = this.remote.getLocation(this.event.location);
    this.miscInfo = makeMiscInfo(this.event);
  }

  get title(): string {
    return this.event.title ? getEventTitle(this.event.title) : '';
  }

  get isMonthly(): boolean {
    return this.event.category === 'monthly';
  }

  get showMonthly$(): Observable<boolean> {
    return this.isMonthly ? this.isHandset$ : observableOf(false);
  }
}
