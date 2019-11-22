import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonService } from '../common.service';
import { EventCategory, MarkerDialogData } from '../models';

@Component({
  selector: 'app-marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.css']
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

  get showEventBotton() {
    return this.data.category === 'upcoming' || this.data.category === 'local';
  }

  get showDialogBotton() {
    return this.data.category === 'past' || this.data.category === 'monthly';
  }

  get showList() {
    return this.data.category !== 'monthly';
  }

  eventTitle(name: string) {
    return this.cs.getEventAliase(name);
  }
}
