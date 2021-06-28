import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { GeoMarker } from '../map-common';
import { EventCategory } from '../models';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';
import { environment } from '../../environments/environment';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';
import { GoogleMapsApiService } from '../googlemapsapi.service';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent implements OnInit {
  @Input() category!: EventCategory;
  @Output() markerSelected = new EventEmitter<GeoMarker>();
  apiLoaded$: Observable<boolean>;
  mapSource$: BehaviorSubject<GeoMarker[]> = new BehaviorSubject<GeoMarker[]>([]);
  loading = true;
  zoom = environment.googlemaps.zoom;
  center = environment.googlemaps.center;
  mapOptions = {
    minZoom: 4,
    disableDefaultUI: true
  };

  get height(): string {
    const height = getBodyHeight() - getHeaderHeight() - getFooterHeight() - getMatHeaderHeight();
    return `${height}px`;
  }

  get width(): string {
    const element = this.el.nativeElement.querySelector('#googlemap');
    if (!element) {
      return '';
    }
    const width = element.getBoundingClientRect().width;
    return `${width}px`;
  }

  constructor(
    private el: ElementRef<Element>,
    private remote: RemoteService,
    public dialog: MatDialog,
    private googleMapsApi: GoogleMapsApiService
  ) {
    this.apiLoaded$ = this.googleMapsApi.load$();
  }

  ngOnInit(): void {
    if (!this.category) {
      throw new Error('[category] is required');
    }
  }

  onTilesloaded(): void {
    this.loadEvents();
  }

  onMarkerClick(event: google.maps.MapMouseEvent): void {
    const markers = this.mapSource$.getValue();
    const marker = markers.find(m => event.latLng.equals(new google.maps.LatLng(m.position.lat, m.position.lng)));
    if (!marker) {
      return;
    }
    const location = marker.location;
    const eventsName: string[] = [];
    for (const m of markers) {
      if (m.location === location) {
        eventsName.push(m.title);
      }
    }
    this.openDialog(this.category, marker, eventsName);
  }

  openDialog(cat: EventCategory, marker: GeoMarker, eventNames: string[]): void {
    this.dialog.open(MarkerDialogComponent, {
      width: '400px',
      data: {
        category: cat,
        position: marker.position,
        location: marker.location,
        events: eventNames
      }
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const markers = this.mapSource$.getValue();
      const mk = markers.find(m => (m.title === result || m.location === result));
      this.markerSelected.emit(mk);
    });
  }

  private loadEvents() {
    this.remote.getEvents(this.category).subscribe(
      events => {
        this.loadMarkers(events);
      }
    );
  }

  private loadMarkers(events: EventInfo[]) {
    const markers: GeoMarker[] = [];
    from(events).subscribe(
      event => this.remote.getLocation(event.location).subscribe(
        location => markers.push(makeMarker(event, location))
      ),
      err => console.log(err),
      () => {
        this.mapSource$.next(markers);
        this.mapSource$.complete();
        this.loading = false;
      }
    );
  }
}

function makeMarker(event: EventInfo, location: LocationInfo): GeoMarker {
  return {
    position: {
      lat: location.geolocation[0],
      lng: location.geolocation[1]
    },
    location: location.id,
    title: event.title ?? ''
  };
}

function getBodyHeight(): number {
  const element = document.documentElement;
  const body = document.getElementsByTagName('body')[0];
  const height = window.innerHeight
    || (element != null ? element.clientHeight : null)
    || (body != null ? body.clientHeight : null);
  const result = height != null ? height : 0;
  return result;
}

function getHeaderHeight(): number {
  const element = document.getElementById('header');
  const height = element != null ? element.clientHeight : 0;
  return height;
}

function getMatHeaderHeight(): number {
  const element = document.getElementsByTagName('mat-tab-header')[0];
  const height = element != null ? element.clientHeight : 0;
  return height;
}

function getFooterHeight(): number {
  const element = document.getElementById('footer');
  const height = element != null ? element.clientHeight : 0;
  return height;
}
