import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MouseEvent } from '@agm/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GeoMarker } from '../models';
import { CommonService } from '../common.service';

import { environment } from '../../environments/environment';

interface MarkerDialogData {
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  events: string[];
}

@Component({
  selector: 'app-marker-dialog',
  template: `
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-content>
    <ng-template ngFor let-event [ngForOf]="data.events">
      <p>
        {{eventTitle(event)}}
        <button mat-stroked-button [mat-dialog-close]="result(event)">
          {{detail}}
        </button>
      </p>
    </ng-template>
  </div>`,
  styles: ['h1 { font-size: 16px; }']
})
export class MarkerDialogComponent {
  public dialogRef: MatDialogRef<MarkerDialogComponent>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MarkerDialogData,
    private cs: CommonService,
  ) {}

  get title() {
    const locationInfo = this.cs.getLocation(this.data.location);
    const locationName = this.cs.getLocationName(this.data.location);
    const region = this.cs.getPrefecture(locationInfo.prefecture);
    return `${locationName}, ${region}`;
  }

  get detail() {
    return this.cs.getMenuAliase('Detail');
  }

  eventTitle(name: string) {
    return this.cs.getEventAliase(name);
  }

  result(eventName: string) {
    if (this.data.events.length > 1) {
      return eventName;
    }
    return this.data.location;
  }
}

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent {
  @Input() mapSource$: BehaviorSubject<GeoMarker[]>;
  @Output() markerSelected = new EventEmitter<GeoMarker>();
  latitude = environment.map.center.lat;
  longitude = environment.map.center.lng;
  zoom = environment.map.zoom;

  constructor(
    private cs: CommonService,
    public dialog: MatDialog,
  ) {
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
    this.openDialog(marker, eventsName);
  }

  openDialog(marker: GeoMarker, eventNames: string[]) {
    this.dialog.open(MarkerDialogComponent, {
      data: {
        position: marker.position,
        location: marker.location,
        events: eventNames
      }
    })
    .afterClosed().subscribe(result => {
       const markers = this.mapSource$.getValue();
       const mk = markers.find(m => (m.title === result || m.location === result));
       this.markerSelected.emit(mk);
     });
  }
}
