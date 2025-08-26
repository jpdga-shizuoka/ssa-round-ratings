import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalizeService } from '../localize.service';
import { RemoteService } from '../remote.service';
import { EventInfo } from '../models';
import { Calendar } from './icalendar.class';
import { LocalizePipe } from '../localize.pipe';

@Component({
    selector: 'app-icalendar',
    templateUrl: './icalendar.component.html',
    styleUrls: ['./icalendar.component.css'],
    imports: [
        CommonModule,
        LocalizePipe
    ]
})
export class IcalenderComponent implements OnInit {
  @Input() event!: EventInfo;
  url?: SafeResourceUrl;
  filename?: string;

  constructor(
    private remote: RemoteService,
    private sanitizer: DomSanitizer,
    private localize: LocalizeService
  ) { }

  ngOnInit(): void {
    if (!this.event) {
      throw new Error('[event] is required');
    }
    this.remote
      .getLocation(this.event.location)
      .subscribe(location => {
        const calendar = new Calendar(this.localize, this.event, location);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(calendar.toBlob())
        );
        this.filename = `${this.event.id}.ics`;
      });
  }
}
