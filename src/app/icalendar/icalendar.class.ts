import { LocalizeService } from '../localize.service';
import { EventInfo, LocationInfo } from '../models';
import { date2string, escape } from './icalendar.libs';

export class Calendar {
  private title: string;
  private start: Date;
  private end: Date;
  private location: string;

  constructor(localize: LocalizeService, event: EventInfo, location: LocationInfo) {
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
    data.push(`DTSTART:${date2string(this.start)}`);
    data.push(`DTEND:${date2string(this.end)}`);
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
