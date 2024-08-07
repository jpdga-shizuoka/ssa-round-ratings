import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../environments/environment';

const GOOGLE_MAPS_API
  = `https://maps.googleapis.com/maps/api/js?key=${environment.googlemaps.apikey}&libraries=marker`;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsApiService {
  private apiLoaded?: Observable<boolean>;

  constructor(
    private httpClient: HttpClient
  ) { }

  //
  // load a script for Google Maps Api asynchronously
  // @see https://github.com/angular/components/tree/master/src/google-maps
  //
  load$(): Observable<boolean> {
    if (!this.apiLoaded) {
      this.apiLoaded = this.httpClient.jsonp(GOOGLE_MAPS_API, 'callback').pipe(
        map(() => true),
        catchError(() => of(false)),
        shareReplay(1)
      );
    }
    return this.apiLoaded;
  }
}
