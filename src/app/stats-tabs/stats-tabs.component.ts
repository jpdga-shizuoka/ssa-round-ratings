import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CommonService } from '../common.service';
import { TotalYearPlayers } from '../models';

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent implements OnInit {

  playersSource: TotalYearPlayers[];

  constructor(
    private cs: CommonService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const lists = this.cs.getPastLists();
      this.playersSource = lists.players;
    });
  }

  get title() {
    return this.cs.getMenuAliase('Stats');
  }

  get players() {
    return this.cs.getMenuAliase('Anual Total Players');
  }

  back() {
    this.location.back();
  }
}
