import { Pipe, PipeTransform } from '@angular/core';
import { Schedule } from './models';
import { LocalizeService } from './localize.service';

type ScheduleType = 'day' | 'month';
type Dictionary = { [string: string]: string; };
const DAYS_OF_WEEK: Dictionary[] = [{
  su: 'Sun.', mo: 'Mon.', tu: 'Tue.', we: 'Wed.', th: 'Thu.', fr: 'Fri.', sa: 'Sat.'
}, {
  su: '日曜', mo: '月曜', tu: '火曜', we: '水曜', th: '木曜', fr: '金曜', sa: '土曜'
}];
const NUMBER_OF_WEEK: string[][] = [
  ['', '1st', '2nd', '3rd', '4th', '5th'],
  ['', '第1', '第2', '第3', '第4', '第5']
];
const MONTH_TABLE: {
  primary: string[];
  secondary: string[];
} = {
  primary: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  secondary: ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
};
const MONTH_DEFAULTS: number[] = [];

@Pipe({
  name: 'schedule',
  standalone: true
})
export class SchedulePipe implements PipeTransform {
  constructor(private readonly localize: LocalizeService) {}

  transform(value?: Schedule, type?: ScheduleType): string {
    if (!value || !type) {
      return '';
    }
    switch (type) {
      case 'day':
        return this.monthlyDay(value);
      case 'month':
        return this.month(value);
    }
  }

  private monthlyDay(schedule: Schedule): string {
    if (schedule.bySetPos) {
      return this.localize.isGlobal
        ? `${NUMBER_OF_WEEK[0][schedule.bySetPos]} ${DAYS_OF_WEEK[0][schedule.byDay[0]]}`
        : `${NUMBER_OF_WEEK[1][schedule.bySetPos]}${DAYS_OF_WEEK[1][schedule.byDay[0]]}`;
    } else {
      return this.localize.isGlobal
        ? `${DAYS_OF_WEEK[0][schedule.byDay[0]]}`
        : `${DAYS_OF_WEEK[1][schedule.byDay[0]]}`;
    }
  }

  private month(schedule: Schedule): string {
    const results: string[] = [];
    for (const month of (schedule.byMonth || MONTH_DEFAULTS)) {
      results.push(this.localize.isGlobal
        ? MONTH_TABLE.primary[month]
        : MONTH_TABLE.secondary[month]);
    }
    return results.join(' ');
  }
}
