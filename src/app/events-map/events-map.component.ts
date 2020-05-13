import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { GeoMarker } from '../map-common';
import { EventCategory } from '../models';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';
import { environment } from '../../environments/environment';
import { RemoteService, EventInfo, LocationInfo } from '../remote.service';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent implements OnInit {
  @Input() category: EventCategory;
  @Output() markerSelected = new EventEmitter<GeoMarker>();
  private events: EventInfo[];
  latitude = environment.map.center.lat;
  longitude = environment.map.center.lng;
  zoom = environment.map.zoom;
  mapSource$: BehaviorSubject<GeoMarker[]> = new BehaviorSubject<GeoMarker[]>([]);
  loading = true;

  get height() {
    const height = getBodyHeight() - getHeaderHeight() - getFooterHeight() - getMatHeaderHeight();
    return height + 'px';
  }

  constructor(
    private remote: RemoteService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.remote.getEvents(this.category).subscribe(
      events => this.events = events,
      err => console.log(err),
      () => this.loadMarkers()
    );
  }

  onMarkerClick(event) {
    const markers = this.mapSource$.getValue();
    const marker = markers.find(m => m.position.lat === event.latitude && m.position.lng === event.longitude);
    const location = marker.location;
    const eventsName: string[] = [];
    for (const m of markers) {
      if (m.location === location) {
        eventsName.push(m.title);
      }
    }
    this.openDialog(this.category, marker, eventsName);
  }

  openDialog(cat: EventCategory, marker: GeoMarker, eventNames: string[]) {
    this.dialog.open(MarkerDialogComponent, {
      width: '400px',
      data: {
        category: cat,
        position: marker.position,
        location: marker.location,
        events: eventNames
      }
    })
    .afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const markers = this.mapSource$.getValue();
      const mk = markers.find(m => (m.title === result || m.location === result));
      this.markerSelected.emit(mk);
    });
  }

  private loadMarkers() {
    const markers: GeoMarker[] = [];
    from(this.events).subscribe(
      event => this.remote.getLocation(event.location).subscribe(
        location => markers.push(makeMarker(event, location))
      ),
      err => console.log(err),
      () => {
        this.mapSource$.next(markers);
        this.loading = false;
      }
    );
  }
}

function makeMarker(event: EventInfo, location: LocationInfo) {
  return {
    position: {
      lat: location.geolocation[0],
      lng: location.geolocation[1]
    },
    location: location.id,
    title: event.title,
  };
}

function getBodyHeight() {
    const element = document.documentElement;
    const body = document.getElementsByTagName('body')[0];
    const height = window.innerHeight
    || (element != null ? element.clientHeight : null)
    || (body != null ? body.clientHeight : null);
    return height != null ? height : 0;
}

function getHeaderHeight() {
  const element = document.getElementById('header');
  return element != null ? element.clientHeight : 0;
}

function getMatHeaderHeight() {
    const element = document.getElementsByTagName('mat-tab-header')[0];
    return element != null ? element.clientHeight : 0;
}

function getFooterHeight() {
  const element = document.getElementById('footer');
  return element != null ? element.clientHeight : 0;
}
