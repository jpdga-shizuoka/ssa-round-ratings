import { LocalizeService } from '../localize.service';
import { EventInfo, LocationInfo } from '../models';
import { dayOfStart, dayOfEnd, escape } from './icalendar.libs';

export class Calendar {
  private title: string;
  private start: string;
  private end: string;
  private location: string;

  constructor(localize: LocalizeService, event: EventInfo, location: LocationInfo) {
    this.title = localize.transform(event.title);
    this.start = dayOfStart(new Date(event.period?.from ?? 0));
    this.end = dayOfEnd(new Date(event.period?.to ?? 0));
    this.location = localize.transform(
      localize.transform(escape(location.title))
    );
  }

  toString(): string {
    const data: string[] = [];
    data.push('BEGIN:VCALENDAR');
    data.push('VERSION:2.0');
    data.push('PRODID:-//jpdgashizuoka/dgjapan//NONSGML v1.0//EN');
    data.push('BEGIN:VEVENT');
    data.push(`DTSTART;VALUE=DATE:${this.start}`);
    data.push(`DTEND;VALUE=DATE:${this.end}`);
    data.push(`LOCATION:${this.location}`);
    data.push(`SUMMARY:${this.title}`);
    data.push('END:VEVENT');
    data.push('END:VCALENDAR');
    data.push('');
    return data.join('\r\n');
  }

  toBlob(): Blob {
    return new Blob([this.toString()], { type: 'text/calendar' });
  }
}
