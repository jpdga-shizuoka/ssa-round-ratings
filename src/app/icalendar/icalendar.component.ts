import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalizeService } from '../localize.service';
import { EventInfo } from '../models';

function date2string(date: Date): string {
  const iso = date.toISOString().replace(/[\-:.]/g, '');
  return iso.replace(/\d{3}Z$/, 'Z');
}

class Calendar {
  private title: string;
  private start: Date;
  private end: Date;

  constructor(
    private localize: LocalizeService,
    private event: EventInfo
  ) {
    if (!event) {
      return;
    }
    this.title = localize.transform(event.title);
    this.start = new Date(event.period.from);
    this.end = new Date(event.period.to);
    this.start.setHours(9);
    this.start.setMinutes(0);
    this.start.setSeconds(0);
    this.start.setMilliseconds(0);
    this.end.setHours(16);
    this.end.setMinutes(0);
    this.end.setSeconds(0);
    this.end.setMilliseconds(0);
  }

  toString(): string {
    const data: string[] = [];
    data.push('BEGIN:VCALENDAR');
    data.push('VERSION:2.0');
    data.push('PRODID:-//jpdgashizuoka/dgjapan//NONSGML v1.0//EN');
    data.push('BEGIN:VEVENT');
    data.push(`DTSTART:${date2string(this.start)}`);
    data.push(`DTEND:${date2string(this.end)}`);
    data.push(`SUMMARY:${this.title}`);
    data.push('END:VEVENT');
    data.push('END:VCALENDAR');
    data.push('');
    return data.join('\r\n');
  }
}

@Component({
  selector: 'app-icalendar',
  templateUrl: './icalendar.component.html',
  styleUrls: ['./icalendar.component.css']
})
export class IcalenderComponent implements OnInit {
  @Input() event: EventInfo;
  url?: SafeResourceUrl;
  filename?: string;

  constructor(
    private sanitizer: DomSanitizer,
    private localize: LocalizeService
    ) { }

  ngOnInit(): void {
    if (this.event) {
      const calendar = new Calendar(this.localize, this.event);
      const blob = new Blob([calendar.toString()], { type: 'text/calendar' });
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      this.filename = `${this.event.id}.ics`;
    }
  }
}
