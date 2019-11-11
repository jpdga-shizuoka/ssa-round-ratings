import { Injectable } from '@angular/core';

import EVENTS from '../assets/model/events.json';
import LOCATIONS from '../assets/model/locations.json';
import ROUNDS from '../assets/model/rounds.json';
import TERMS from '../assets/model/terms.json';
import MONTHLY_EVENTS from '../assets/model/monthly-events.json';

import EVENT_ALIASE from '../assets/model/event-aliase-dictionary.json';
import LOCATION_ALIASE from '../assets/model/location-aliase-dictionary.json';
import PREFECTURE_ALIASE from '../assets/model/prefecture-aliase-dictionary.json';

import {
  RoundInfo, EventInfo, LocationInfo, TermDescription, MonthlyEvent, Schedule
} from './models';

export { ICONS, MiscInfo } from './models';
export { RoundInfo, EventInfo, LocationInfo, TermDescription, MonthlyEvent };

const DaysOfWeek = [{
  su: 'Sun.', mo: 'Mon.', tu: 'Tue.', we: 'Wed.', th: 'Thu.', fr: 'Fri.', sa: 'Sat.'
}, {
  su: '日曜', mo: '月曜', tu: '火曜', we: '水曜', th: '木曜', fr: '金曜', sa: '土曜'
}];
const NumberOfWeek = [
  ['', '1st', '2nd', '3rd', '4th', '5th'],
  ['', '第1', '第2', '第3', '第4', '第5']
];
const MonthTabel = {
  primary: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  secondary: ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
}
const MONTH_DEFAULTS = [];

interface EventParts {
  count: number;
  key: string;
}

interface EventsMap {
  [key: string]: EventInfo;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  primaryLanguage = true;
  private eventMap: EventsMap;
  private rounds: RoundInfo[];

  constructor() {
    this.eventMap = makeEventsMap();
  }

  toggleLanguage() {
    this.primaryLanguage = !this.primaryLanguage;
  }

  getMonthlyDay(schedule: Schedule): string {
    const primary = this.primaryLanguage ? 0 : 1;
    return `${NumberOfWeek[primary][schedule.bySetPos]} ${DaysOfWeek[primary][schedule.byDay[0]]}`;
  }

  getUpcomingEvents(): EventInfo[] {
    const events: EventInfo[] = [];
    const now = Date.now();
    for (const event of EVENTS) {
      const date = new Date(event.period.to);
      if (date.getTime() > now) {
        events.push(event);
      }
    }
    events.sort((a, b) => {
      const t1 = new Date(a.period.from);
      const t2 = new Date(b.period.to);
      return t1.getTime() - t2.getTime();
    });
    return events;
  }

  getMonthlyEvents(): MonthlyEvent[] {
    return MONTHLY_EVENTS;
  }

  getTerms(): TermDescription[] {
    return TERMS;
  }

  getRounds(): RoundInfo[] {
    if (this.rounds) {
      return this.rounds;
    }
    const rounds = ROUNDS.concat();
    for (const round of rounds) {
      if (round.ratings) {
        round['weight'] = calcWeight(round.ratings.player1, round.ratings.player2);
        round['offset'] = calcOffset(round);
        round['ssa'] = calcSsa(round);
        round['category'] = calcCategory(round['ssa']);
      }
    }
    rounds.sort((a, b) => {
      const t1 = new Date(a.date);
      const t2 = new Date(b.date);
      return t2.getTime() - t1.getTime();
    });
    this.rounds = rounds;
    return this.rounds;
  }

  getEventAliase(eventName: string): string {
    if (this.primaryLanguage) {
      return eventName;
    }
    const parts = getEventKey(eventName);
    if (!parts) {
      return eventName;
    }
    const aliase = EVENT_ALIASE[parts.key];
    if (!aliase) {
      return eventName;
    }
    if (parts.count > 1960) {
      return !aliase ? eventName : `${parts.count}年 ${aliase}`;
    }
    return !aliase ? eventName : `第${parts.count}回 ${aliase}`;
  }

  getPrefecture(prefectureName: string): string | undefined {
    if (!prefectureName) {
      return undefined;
    }
    if (this.primaryLanguage) {
      return prefectureName;
    }
    return PREFECTURE_ALIASE[getKeyFromName(prefectureName)]
      || prefectureName;
  }

  getEvent(eventName: string): EventInfo | undefined {
    return this.eventMap[getKeyFromName(eventName)];
  }

  getMonth(schedule: Schedule): string {
    const results: string[] = [];
    for (const month of (schedule.byMonth || MONTH_DEFAULTS)) {
      results.push(this.primaryLanguage
        ? MonthTabel.primary[month]
        : MonthTabel.secondary[month]);
    }
    return results.join(' ');
  }

  getLocation(locationName: string): LocationInfo | undefined {
    return LOCATIONS[getKeyFromName(locationName)];
  }

  getLocationName(locationName: string): string | undefined {
    if (this.primaryLanguage) {
      return locationName;
    }
    return LOCATION_ALIASE[getKeyFromName(locationName)] || locationName;
  }

  getGeolocation(ll: [number, number]): string | undefined {
    return ll
      ? getUrlForGeolocation() + `${ll[0]},${ll[1]}`
      : undefined;
  }

  getJpdgaInfo(eventId: string): string | undefined {
    return eventId
      ? `http://www.jpdga.jp/event.php?tno=${eventId}`
      : undefined;
  }

  getJpdgaResult(eventId: string): string | undefined {
    return eventId
      ? `http://www.jpdga.jp/result.php?tno=${eventId}`
      : undefined;
  }

  getJpdgaReport(topicId: string): string | undefined {
    return topicId
      ? `http://www.jpdga.jp/main/index.php?itemid=${topicId}`
      : undefined;
  }

  getJpdgaPhoto(photoId: string): string | undefined {
    return photoId
      ? `https://www.flickr.com/photos/jpdga/albums/${photoId}`
      : undefined;
  }

  getPdgaResult(eventId: string): string | undefined {
    return eventId
      ? `https://www.pdga.com/tour/event/${eventId}`
      : undefined;
  }

  getEventTitle(name: string): string {
    const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
    const results = name.trim().toLowerCase().match(eventName);
    return (!results || results.length !== 4)
      ? name
      : results[3];
  }
}

function getKeyFromName(name: string): string {
  if (!name) {
    return '';
  }
  return name.trim().toLowerCase().replace(/[ -]/g, '');
}

function getUrlForGeolocation(): string {
  return isAppleDevice()
    ? 'http://maps.apple.com/?ll='
    : 'https://maps.google.com/?q=';
}

function isAppleDevice(): boolean {
  return /iPhone|iPad|Macintosh/.test(window.navigator.userAgent);
}

function getEventKey(name: string): EventParts | undefined {
  if (!name) {
    return undefined;
  }
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/i;
  const results = name.trim().toLowerCase().match(eventName);
  if (!results || results.length !== 4) {
    return undefined;
  }
  return {
    count: parseInt(results[1], 10),
    key: results[3].replace(/[ -]/g, '')
  };
}

function makeEventsMap(): EventsMap {
  const eventMap = {};
  for (const event of EVENTS) {
    eventMap[getKeyFromName(event.title)] = event;
  }
  return eventMap;
}

function calcWeight(player1: { score: number, rating: number }, player2: { score: number, rating: number }) {
  return (player1.rating - player2.rating) / (player1.score - player2.score);
}

function calcOffset(round: RoundInfo) {
  return round.ratings.player1.rating - round['weight'] * round.ratings.player1.score;
}

function calcSsa(round: RoundInfo) {
  const holes = round.holes || 18;
  const regulation = holes / 18;
  return (1000 - round['offset']) / round['weight'] / regulation;
}

function calcCategory(ssa: number) {
  if (ssa < 48) {
    return 'A';
  } else if (ssa < 54) {
    return '2A';
  } else if (ssa < 60) {
    return '3A';
  } else if (ssa < 66) {
    return '4A';
  } else {
    return '5A';
  }
}
