import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventCategory, EventInfo } from '../models';
import { RemoteService, LocationInfo } from '../remote.service';
import { Position } from '../map-common';

export interface MarkerDialogData {
  category: EventCategory;
  position: Position;
  location: string;
  events: EventInfo[];
}

@Component({
  selector: 'app-marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.css']
})
export class MarkerDialogComponent {
  location$: Observable<LocationInfo>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MarkerDialogData,
    private readonly remote: RemoteService
  ) {
    this.location$ = this.remote.getLocation(this.data.location);
  }

  get events(): EventInfo[] {
    return this.data.events;
  }

  get showEventBotton(): boolean {
    return this.data.category === 'upcoming' || this.data.category === 'past';
  }

  get showDialogBotton(): boolean {
    return this.data.category === 'local' || this.data.category === 'monthly';
  }

  get showList(): boolean {
    return this.data.category !== 'monthly';
  }
}
