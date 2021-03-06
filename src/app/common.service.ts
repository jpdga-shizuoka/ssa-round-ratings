import { Injectable } from '@angular/core';

import EVENTS from '../assets/model/events.json';
import LOCAL_EVENTS from '../assets/model/local-events.json';
import MONTHLY_EVENTS from '../assets/model/monthly-events.json';
import LOCATIONS from '../assets/model/locations.json';
import ROUNDS from '../assets/model/rounds.json';

import EVENT_ALIASE from '../assets/model/event-aliase-dictionary.json';
import LOCATION_ALIASE from '../assets/model/location-aliase-dictionary.json';
import PREFECTURE_ALIASE from '../assets/model/prefecture-aliase-dictionary.json';
import MENU_ALIASE from '../assets/model/menu-aliase-dictionary.json';

import {
  TotalYearPlayers, Players, VideoInfo, PastLists,
  RoundInfo, EventInfo, LocationInfo, TermDescription, Schedule, GeoMarker
} from './models';

export { ICONS, MiscInfo } from './models';
export { RoundInfo, EventInfo, LocationInfo, TermDescription, GeoMarker };

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
};
const MONTH_DEFAULTS = [];

interface EventParts {
  count: number;
  key: string;
}

interface EventsMap {
  [key: string]: EventInfo;
}

class CEventInfo {

  constructor(private event: EventInfo) {}

  get year(): number {
    const date = new Date(this.event.period.from);
    return date.getFullYear();
  }
}

class CTotalYearPlayers {
  private annualPlayers = {};

  add(year: number, players: Players) {
    if (!this.annualPlayers[year]) {
      this.annualPlayers[year] = {
        pro: 0,
        ama: 0,
        misc: 0
      };
    }
    this.annualPlayers[year].pro += players.pro;
    this.annualPlayers[year].ama += players.ama;
    this.annualPlayers[year].misc += players.misc;
  }

  get result(): TotalYearPlayers[] {
    const result: TotalYearPlayers[] = [];

    Object.keys(this.annualPlayers).forEach(key => {
      result.push({
        year: parseInt(key, 10),
        players: this.annualPlayers[key]
      });
    });
    return result;
  }
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

  getEvents(category?: string): EventInfo[] {
    switch (category) {
      case 'past':
        return filterPastEvents(EVENTS);
      case 'upcoming':
        return filterUpcomingEvents(EVENTS);
      case 'local':
        return filterUpcomingEvents(LOCAL_EVENTS);
      case 'monthly':
        return MONTHLY_EVENTS;
      case undefined:
        return EVENTS;
    }
    return [];
  }

  getTotalPlayers(): TotalYearPlayers[] {
    const events = this.getEvents('past');
    const total = new CTotalYearPlayers();
    events.forEach(event => {
      if (event.players) {
        const info = new CEventInfo(event);
        total.add(info.year, event.players);
      }
    });
    return total.result;
  }

  getVideoList(key: string | undefined): VideoInfo[] {
    const list: VideoInfo[] = [];
    this.getEvents().forEach(event => {
      if (event.urls) {
        event.urls.forEach(url => {
          if (url.type !== 'video') {
            return;
          }
          if (key && !event.title.toLowerCase().includes(key.toLowerCase())) {
            return;
          }
          list.push({
            title: event.title,
            subttl: url.title,
            date: new Date(event.period.from),
            url: url.url,
          });
        });
        list.sort((a, b) => compareByDate(a.date, b.date));
      }
    });
    return list;
  }

  getPastLists(): PastLists {
    const total = new CTotalYearPlayers();
    const list: VideoInfo[] = [];
    const events = this.getEvents('past');

    events.forEach(event => {
      if (event.players) {
        const info = new CEventInfo(event);
        total.add(info.year, event.players);
      }
      if (event.urls) {
        event.urls.forEach(url => {
          if (url.type === 'video') {
            list.push({
              title: event.title,
              subttl: url.title,
              date: new Date(event.period.from),
              url: url.url,
            });
          }
        });
        list.sort((a, b) => compareByDate(a.date, b.date));
      }
    });
    return {
      players: total.result,
      videos: list,
    };
  }

  getDate(event: EventInfo): string {
    try {
      const from = (new Date(event.period.from))
        .toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
      if (event.period.from === event.period.to) {
        return from;
      }
      const to = (new Date(event.period.to))
        .toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
      return `${from} - ${to}`;
    } catch {
      const from = (new Date(event.period.from)).toLocaleDateString();
      if (event.period.from === event.period.to) {
        return from;
      }
      const to = (new Date(event.period.to)).toLocaleDateString();
      return `${from} - ${to}`;
    }
  }

  getMonthlyDay(schedule: Schedule): string {
    return this.primaryLanguage
    ? `${NumberOfWeek[0][schedule.bySetPos]} ${DaysOfWeek[0][schedule.byDay[0]]}`
    : `${NumberOfWeek[1][schedule.bySetPos]}${DaysOfWeek[1][schedule.byDay[0]]}`;
  }

  getRounds(): RoundInfo[] {
    if (this.rounds) {
      return this.rounds;
    }

    const rounds: RoundInfo[] = [];
    const now = Date.now();
    for (const round of ROUNDS) {
      const date = new Date(round.date);
      if (date.getTime() < now) {
        rounds.push(round);
      }
    }

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

  getMenuAliase(name: string): string {
    if (this.primaryLanguage) {
      return name;
    }
    const alt = MENU_ALIASE[name.toLowerCase()];
    if (alt) {
      return alt;
    }
    return name;
  }

  getEventTitleAliase(eventTitle: string) {
    return EVENT_ALIASE[eventTitle];
  }

  getEventAliase(eventName: string): string {
    if (this.primaryLanguage) {
      return eventName;
    }
    const parts = getEventKey(eventName);
    if (parts == null) {
      const title = EVENT_ALIASE[getKeyFromName(eventName)];
      return title ? title : eventName;
    }
    const aliase = EVENT_ALIASE[parts.key];
    if (aliase == null) {
      return eventName;
    }
    if (parts.count == null) {
      return aliase;
    }
    if (parts.count > 1960) {
      return `${parts.count}年 ${aliase}`;
    }
    return `第${parts.count}回 ${aliase}`;
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

  getGeolocation(location: [number, number] | string): string | undefined {
    let ll: [number, number];
    if (Array.isArray(location)) {
      ll = location;
    } else if (typeof location === 'string') {
      const info = this.getLocation(location);
      if (info?.geolocation) {
        ll = info.geolocation;
      }
    }
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
  if (name == null) {
    return undefined;
  }
  const n = name.trim().toLowerCase();
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
  const altEventName = /the (.+)/;

  let results = n.match(eventName);
  if (results == null) {
    results = n.match(altEventName);
    if (results == null) {
      return undefined;
    }
    if (results.length !== 2) {
      return undefined;
    }
    return {
      count: undefined,
      key: results[1].replace(/[ -]/g, '')
    };
  } else if (results.length !== 4) {
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

function filterUpcomingEvents(events: EventInfo[]): EventInfo[] {
  const result: EventInfo[] = [];
  const now = Date.now();
  for (const event of events) {
    const date = new Date(event.period.to);
    if (date.getTime() > now) {
      result.push(event);
    }
  }
  result.sort((a, b) => {
    const t1 = new Date(a.period.from);
    const t2 = new Date(b.period.to);
    return t1.getTime() - t2.getTime();
  });
  return result;
}

function filterPastEvents(events: EventInfo[]): EventInfo[] {
  const result: EventInfo[] = [];
  const now = Date.now();
  for (const event of events) {
    const date = new Date(event.period.to);
    if (date.getTime() < now) {
      result.push(event);
    }
  }
  result.sort((a, b) => {
    const t1 = new Date(a.period.from);
    const t2 = new Date(b.period.to);
    return t1.getTime() - t2.getTime();
  });
  return result;
}

function compareByDate(a: Date, b: Date): number {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
