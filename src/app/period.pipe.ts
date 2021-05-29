import { Pipe, PipeTransform } from '@angular/core';
import { Period } from './models';

const LONG_FORMAT = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
const SHORT_FORMAT = { day: 'numeric' } as Intl.DateTimeFormatOptions;

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {
  transform(value: Period|string): string {
    if (isDate(value)) {
      return new Date(value as string).toLocaleDateString(undefined, LONG_FORMAT);
    }
    if (isPeriod(value)) {
      const period = value;
      try {
        const from = new Date(period.from).toLocaleDateString(undefined, LONG_FORMAT);
        if (period.from === period.to) {
          return from;
        }
        const to = new Date(period.to).toLocaleDateString(undefined, SHORT_FORMAT);
        return `${from} - ${to}`;
      } catch {
        const from = (new Date(period.from)).toLocaleDateString();
        if (period.from === period.to) {
          return from;
        }
        const to = (new Date(period.to)).toLocaleDateString();
        return `${from} - ${to}`;
      }
    }
    return '';
  }
}

function isPeriod(x: Period | string): x is Period {
  if (typeof x === 'string') {
    return false;
  }
  return 'from' in x && 'to' in x;
}

function isDate(x: Period | string): boolean {
  if (typeof x !== 'string') {
    return false;
  }
  return /[\d]{4}-[\d]{2}-[\d]{2}/.test(x);
}
