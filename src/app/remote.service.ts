import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of as observableOf, Subscription } from 'rxjs';
import { catchError, tap, map, first } from 'rxjs/operators';

import {
  category2url, upcomingFilter, sortEvents, countPlayers, compareByDate, filterByList
} from './libs';
import {
  EventInfo, RoundInfo, LocationInfo, EventCategory, VideoInfo, TotalYearPlayers,
  EventId, LocationId, RoundId
} from './models';
export {
  EventInfo, RoundInfo, LocationInfo, EventCategory, VideoInfo, TotalYearPlayers,
  Subscription, EventId, LocationId
};

export type UserFilter = (events: EventInfo[], category: EventCategory) => EventInfo[];

@Injectable({
  providedIn: 'root'
})
export class RemoteService {
  constructor(private readonly http: HttpClient) { }

  getText(path: string): Observable<string> {
    return this.http.get('assets/local/' + path, { responseType: 'text' });
  }

  getEvents(category: EventCategory, filter?: UserFilter): Observable<EventInfo[]> {
    if (!category) {
      throw new TypeError('getEvents: no category specified');
    }
    return this.http
      .get<EventInfo[]>(category2url(category), { responseType: 'json' })
      .pipe(
        first(),
        map(events => upcomingFilter(events, category)),
        map(events => filter ? filter(events, category) : events),
        map(events => sortEvents(events, category)),
        catchError(this.handleError<EventInfo[]>('getEvents', []))
      );
  }

  getEvent(id: EventId, category: EventCategory): Observable<EventInfo> {
    if (!id) {
      throw new TypeError('getEvent: no id specified');
    }
    return this.getEvents(category).pipe(
      map(events => {
        const event = events.find(event => event.id === id);
        if (!event) {
          throw new Error(`no event found: id=${id}`);
        }
        return event;
      })
    );
  }

  getRounds(roundList?: RoundId[]): Observable<RoundInfo[]> {
    return this.http
      .get<RoundInfo[]>('assets/models/rounds.json', { responseType: 'json' })
      .pipe(
        first(),
        map(rounds => roundList ? filterByList(rounds, roundList) : rounds),
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

  getLocation(id?: LocationId): Observable<LocationInfo> {
    if (!id) {
      throw new TypeError('getLocation: no id specified');
    }
    return this.getLocations().pipe(
      map(locations => {
        const location = locations.find(location => location.id === id);
        if (!location) {
          throw new Error(`no location found, id=${id}`);
        }
        return location;
      })
    );
  }

  getVideos(): Observable<VideoInfo[]> {
    const category = 'video' as EventCategory;
    return this.getEvents(category).pipe(
      map(events => this.filterVideos(events))
    );
  }

  getPlayers(): Observable<TotalYearPlayers[]> {
    return this.getEvents('past').pipe(
      map(events => countPlayers(events))
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
            title: event.title ?? '',
            subttl: url.title,
            date: new Date(event.period?.from ?? 0),
            url: url.url
          });
        });
        videos.sort((a, b) => compareByDate(a.date, b.date));
      }
    });
    return videos;
  }

  private handleError<T>(operation = 'operation', result: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return observableOf(result);
    };
  }
}
