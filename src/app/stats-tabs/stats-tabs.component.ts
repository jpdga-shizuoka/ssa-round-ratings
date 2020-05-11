import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent {

  constructor(
    private location: Location,
  ) { }

  back() {
    this.location.back();
  }
}
