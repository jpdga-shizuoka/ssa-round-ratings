import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
export class MarkerDialogComponent implements OnInit {
  public dialogRef: MatDialogRef<MarkerDialogComponent>;
  location: LocationInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MarkerDialogData,
    private readonly remote: RemoteService
  ) {}

  ngOnInit(): void {
    this.remote.getLocation(this.data.location)
      .subscribe(location => { this.location = location; });
  }

  get showEventBotton(): boolean {
    return this.data.category === 'upcoming' || this.data.category === 'local';
  }

  get showDialogBotton(): boolean {
    return this.data.category === 'past' || this.data.category === 'monthly';
  }

  get showList(): boolean {
    return this.data.category !== 'monthly';
  }
}
