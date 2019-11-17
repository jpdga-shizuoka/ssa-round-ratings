import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private cs: CommonService,
  ) {
  }

  ngOnInit() {
  }
}
