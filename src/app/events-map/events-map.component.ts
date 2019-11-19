import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GeoMarker } from '../models';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css']
})
export class EventsMapComponent implements OnInit {
  @Input() mapSource$: BehaviorSubject<GeoMarker[]>;
  @Input() latitude = 36.306148;
  @Input() longitude = 137.995148;
  @Input() zoom = 5;
  @Output() markerSelected = new EventEmitter<GeoMarker>();

  constructor(
    private cs: CommonService,
  ) {
  }

  ngOnInit() {
  }

  onMarkerSelected(event) {
    const markers = this.mapSource$.getValue();
    const marker = markers[event._id];
    this.markerSelected.emit(marker);
  }
}
