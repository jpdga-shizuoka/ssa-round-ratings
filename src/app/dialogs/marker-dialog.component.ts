import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventCategory, MarkerDialogData } from '../models';
import { RemoteService, LocationInfo } from '../remote.service';

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
    private readonly remote: RemoteService,
  ) {}

  ngOnInit() {
    this.remote.getLocation(this.data.location)
      .subscribe(location => this.location = location);
  }

  get showEventBotton() {
    return this.data.category === 'upcoming' || this.data.category === 'local';
  }

  get showDialogBotton() {
    return this.data.category === 'past' || this.data.category === 'monthly';
  }

  get showList() {
    return this.data.category !== 'monthly';
  }
}
