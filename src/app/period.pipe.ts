import { Pipe, PipeTransform } from '@angular/core';
import { Period } from './models';

const LONG_FORMAT = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
const SHORT_FORMAT = { day: 'numeric' } as Intl.DateTimeFormatOptions;

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {
  transform(value: Period|string, type='full'): string {
    if (isDate(value)) {
      const date = new Date(value as string);
      if (type === 'short') {
        return date.getFullYear().toString();
      }
      return date.toLocaleDateString(undefined, LONG_FORMAT);
    }
    if (isPeriod(value)) {
      const period = value;
      try {
        const fromDate = new Date(period.from);
        if (type === 'short') {
          return fromDate.getFullYear().toString();
        }
        const from = fromDate.toLocaleDateString(undefined, LONG_FORMAT);
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
  if (x == null || typeof x !== 'object') {
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
