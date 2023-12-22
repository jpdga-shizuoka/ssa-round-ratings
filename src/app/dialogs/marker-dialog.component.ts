import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';
import { EventCategory } from '../models';
import { RemoteService, LocationInfo } from '../remote.service';

export interface MarkerDialogData {
  category: EventCategory;
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  events: string[];
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
