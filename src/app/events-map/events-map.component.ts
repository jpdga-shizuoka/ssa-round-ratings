import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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
    const events: EventInfo[] = [];
    for (const m of markers) {
      if (m.location === location) {
        events.push({
          id: m.eventId,
          location: m.location,
          title: m.title
        });
      }
    }
    this.openDialog(this.category, marker, events);
  }

  openDialog(cat: EventCategory, marker: GeoMarker, events: EventInfo[]): void {
    this.dialog.open(MarkerDialogComponent, {
      width: '400px',
      data: {
        category: cat,
        position: marker.position,
        location: marker.location,
        events
      }
    }).afterClosed().subscribe(event => {
      if (!event) {
        return;
      }
      if ('id' in event) {
        this.router.navigate(['/event', event.id]);
      } else if ('category' in event) {
        let commands: string[] = [];
        switch (event.category) {
          case 'upcoming':
            commands = ['/events', 'upcoming'];
            break;
          case 'past':
            commands = ['/past', 'events'];
            break;
          case 'local':
            commands = ['/local', 'events'];
            break;
          case 'monthly':
            commands = ['/monthly', 'events'];
            break;
        }
        this.router.navigate(commands, {
          queryParams: {
            location: event.location
          }
        });
      }
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
    eventId: event.id,
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
