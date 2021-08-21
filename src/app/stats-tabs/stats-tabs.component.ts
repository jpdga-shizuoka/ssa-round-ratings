import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

const TABS = ['difficulty', 'players'];

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent implements OnInit {
  selectedTab = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const tag = params.tagname as string;
      const index = TABS.findIndex((value => value === tag));
      if (index >= 0 && index < TABS.length) {
        this.selectedTab = index;
      }
    });
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    const path = this.location.path().split('/');
    path[path.length - 1] = TABS[this.selectedTab];
    this.location.replaceState(path.join('/'));
  }
}
