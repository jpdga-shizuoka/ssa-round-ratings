import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of as observableOf, Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import {
  EventInfo, RoundInfo, LocationInfo, EventCategory, VideoInfo, TotalYearPlayers, Players,
  EventId, LocationId
} from './models';
export {
  EventInfo, RoundInfo, LocationInfo, EventCategory, VideoInfo, TotalYearPlayers,
  Subscription, EventId, LocationId
};

const CATEGORY2FILE = {
  upcoming: 'events',
  past: 'events',
  video: 'events',
  local: 'local-events',
  monthly: 'monthly-events'
};

type AnualPlayers = {
  [year: number]: Players;
}

class CEventInfo {
  constructor(private event: EventInfo) {}
  get year(): number {
    const date = new Date(this.event.period.from);
    return date.getFullYear();
  }
}

class CTotalYearPlayers {
  private annualPlayers: AnualPlayers = {};

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
      const year = parseInt(key, 10);
      result.push({
        year: year,
        players: this.annualPlayers[year]
      });
    });
    return result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RemoteService {
  constructor(private readonly http: HttpClient) { }

  getText(path: string): Observable<string> {
    return this.http.get('assets/local/' + path, { responseType: 'text' });
  }

  getEvents(category: EventCategory): Observable<EventInfo[]> {
    if (!category) {
      throw new TypeError('getEvents: no category specified');
    }
    return this.http
      .get<EventInfo[]>(category2url(category), { responseType: 'json' })
      .pipe(
        map(events => this.upcomingFilter(events, category)),
        map(events => this.sortEvents(events, category)),
        catchError(this.handleError<EventInfo[]>('getEvents', []))
      );
  }

  getEvent(id: EventId, category: EventCategory): Observable<EventInfo> {
    if (!id) {
      throw new TypeError('getEvent: no id specified');
    }
    return this.getEvents(category).pipe(
      map(events => events.find(event => event.id === id))
    );
  }

  getRounds(): Observable<RoundInfo[]> {
    return this.http
      .get<RoundInfo[]>('assets/models/rounds.json', { responseType: 'json' })
      .pipe(
        tap(rounds => rounds.forEach(
          round => { round.event$ = this.getEvent(round.event, 'past'); })),
        map(rounds => {
          const result: RoundInfo[] = [];
          const now = Date.now();
          rounds.forEach(round => {
            if (new Date(round.date).getTime() < now) {
              result.push(round);
            }
          });
          return result;
        }),
        catchError(this.handleError<RoundInfo[]>('getRounds', []))
      );
  }

  getLocations(): Observable<LocationInfo[]> {
    return this.http
      .get<LocationInfo[]>('assets/models/locations.json', { responseType: 'json' });
  }

  getLocation(id: LocationId): Observable<LocationInfo> {
    if (!id) {
      throw new TypeError('getLocation: no id specified');
    }
    return this.getLocations().pipe(
      map(locations => locations.find(location => location.id === id))
    );
  }

  getVideos(category: EventCategory): Observable<VideoInfo[]> {
    return this.getEvents(category).pipe(
      map(events => this.filterVideos(events))
    );
  }

  getPlayers(): Observable<TotalYearPlayers[]> {
    return this.getEvents('past').pipe(
      map(events => this.countPlayers(events))
    );
  }

  private filterVideos(events: EventInfo[]): VideoInfo[] {
    const videos: VideoInfo[] = [];
    events.forEach(event => {
      if (event.urls) {
        event.urls.forEach(url => {
          if (url.type !== 'video') {
            return;
          }
          videos.push({
            title: event.title,
            subttl: url.title,
            date: new Date(event.period.from),
            url: url.url
          });
        });
        videos.sort((a, b) => compareByDate(a.date, b.date));
      }
    });
    return videos;
  }

  private upcomingFilter(events: EventInfo[], category: EventCategory): EventInfo[] {
    if (category === 'monthly') {
      return events;
    }
    // if (category !== 'upcoming' && category !== 'local') {
    //   return events;
    // }
    const result: EventInfo[] = [];
    events.forEach(event => {
      if (compareTime(new Date(event.period.to), category)) {
        result.push(event);
      }
    });
    return result;
  }

  private sortEvents(events: EventInfo[], category: EventCategory): EventInfo[] {
    if (category === 'monthly') {
      return events;
    }
    events.sort((a, b) => {
      const t1 = new Date(a.period.from);
      const t2 = new Date(b.period.to);
      return t1.getTime() - t2.getTime();
    });
    return events;
  }

  private countPlayers(events: EventInfo[]): TotalYearPlayers[] {
    const total = new CTotalYearPlayers();
    events.forEach(event => {
      if (event.players) {
        const info = new CEventInfo(event);
        total.add(info.year, event.players);
      }
    });
    return total.result;
  }

  private handleError<T>(operation = 'operation', result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return observableOf(result);
    };
  }
}

function category2url(category: EventCategory) {
  return `assets/models/${CATEGORY2FILE[category]}.json`;
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

function compareTime(t1: Date, category: EventCategory) {
  const t2 = new Date();
  switch (category) {
    case 'past': {
      t2.setDate(t2.getDate() + 1);
      return t1.getTime() < t2.getTime();
    }
    case 'upcoming': {
      t2.setDate(t2.getDate() - 7);
      return t1.getTime() > t2.getTime();
    }
    case 'local': {
      t2.setDate(t2.getDate() - 1);
      return t1.getTime() > t2.getTime();
    }
    case 'monthly': {
      return t1.getTime() > t2.getTime();
    }
    default:
      return true;
  }
}
