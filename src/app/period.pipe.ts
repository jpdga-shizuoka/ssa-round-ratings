import { Pipe, PipeTransform } from '@angular/core';
import { Period } from './models';

type DateFormat = 'long' | 'neutral' | 'short';

const THIS_YEAR_LONG_FORMAT = { month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
const OTHER_YEAR_LONG_FORMAT = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
const THIS_YEAR_SHORT_FORMAT = { month: 'short', day: 'numeric'  } as Intl.DateTimeFormatOptions;
const OTHER_YEAR_SHORT_FORMAT = { year: 'numeric', month: 'short' } as Intl.DateTimeFormatOptions;
const DAY_FORMAT = { day: 'numeric' } as Intl.DateTimeFormatOptions;

function isPastYear(date: Date): boolean {
  const now = new Date();
  return date.getFullYear() < now.getFullYear();
}

function isThisYear(date: Date): boolean {
  const now = new Date();
  return date.getFullYear() ===  now.getFullYear();
}

function isFutureYear(date: Date): boolean {
  const now = new Date();
  return date.getFullYear() > now.getFullYear();
}

function toLongDate(date: Date): string {
  return date.toLocaleDateString(undefined, isThisYear(date) ? THIS_YEAR_LONG_FORMAT : OTHER_YEAR_LONG_FORMAT);
}

function toShortDate(date: Date): string {
  return date.toLocaleDateString(undefined, isThisYear(date) ? THIS_YEAR_SHORT_FORMAT : OTHER_YEAR_SHORT_FORMAT);
}

function toNeutralDate(date: Date): string {
  if (isFutureYear(date)) {
    return toLongDate(date);
  } else {
    return toShortDate(date);
  }
}

function toDate(date: Date, format: DateFormat): string {
  switch (format) {
    case 'short':
      return toShortDate(date);
    case 'neutral':
      return toNeutralDate(date);
    case 'long':
      return toLongDate(date);
  }
}

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {
  transform(value?: Period | string, format = 'long' as DateFormat): string {
    if (!value) {
      return '';
    }
    if (isDate(value)) {
      const date = new Date(value as string);
      return toDate(date, format);
    }
    if (isPeriod(value)) {
      const period = value;
      try {
        const fromDate = new Date(period.from);
        const from = toDate(fromDate, format);
        if (period.from === period.to) {
          return from;
        }
        if ((format === 'neutral' || format === 'short') && isPastYear(fromDate)) {
          return from;
        }
        const to = new Date(period.to).toLocaleDateString(undefined, DAY_FORMAT);
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
