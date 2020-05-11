import { Injectable } from '@angular/core';

import {
  TotalYearPlayers, Players, VideoInfo, PastLists,
  RoundInfo, EventInfo, LocationInfo, TermDescription, Schedule, GeoMarker
} from './models';

export { ICONS, MiscInfo } from './models';
export { RoundInfo, EventInfo, LocationInfo, TermDescription, GeoMarker };

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

  constructor() { }

  toggleLanguage() {
    this.primaryLanguage = !this.primaryLanguage;
  }

  getGeolocation(location: [number, number]) {
    return getUrlForGeolocation() + `${location[0]},${location[1]}`;
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

  getEventTitle(name?: string): string {
    if (!name) {
      return name;
    }
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
