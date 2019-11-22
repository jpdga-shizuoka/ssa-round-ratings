import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { GeoMarker, EventCategory } from '../models';
import { CommonService } from '../common.service';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent {
  @Input() category: EventCategory;
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
    this.openDialog(this.category, marker, eventsName);
  }

  openDialog(category: EventCategory, marker: GeoMarker, eventNames: string[]) {
    this.dialog.open(MarkerDialogComponent, {
      width: '400px',
      data: {
        category: category,
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
}
