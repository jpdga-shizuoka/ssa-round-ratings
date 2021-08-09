import { Component, Input, OnInit } from '@angular/core';
import { MiscInfo } from '../app-common';
import {
  BreakpointObserver, Observable, isHandset, of as observableOf
} from '../ng-utilities';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';
import { getEventTitle, getLayout, makePdgaInfo, makeJpdgaInfo, makeMiscInfo } from '../app-libs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event!: EventInfo;
  location$?: Observable<LocationInfo>;
  miscInfo: MiscInfo[] = [];
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly remote: RemoteService
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit(): void {
    if (!this.event) {
      throw new Error('[event] is required');
    }
    this.location$ = this.remote.getLocation(this.event.location);
    this.pdgaInfo = makePdgaInfo(this.event);
    this.jpdgaInfo = makeJpdgaInfo(this.event);
    this.miscInfo = makeMiscInfo(this.event);
  }

  get title(): string {
    return this.event.title ? getEventTitle(this.event.title) : '';
  }

  get showPastRounds(): boolean {
    return this.event.category !== 'local'
        && this.event.category !== 'monthly';
  }

  get isMonthly(): boolean {
    return this.event.category === 'monthly';
  }

  get showMonthly$(): Observable<boolean> {
    return this.isMonthly ? this.isHandset$ : observableOf(false);
  }

  get layout(): string | undefined {
    return getLayout(this.event.layout);
  }
}
