import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { RoutingTabsComponent } from '../routing-tabs/routing-tabs.component';
import { LocalizePipe } from '../localize.pipe';
import { DifficultyChartComponent } from '../difficulty-chart/difficulty-chart.component';
import { TermsComponent } from '../terms/terms.component';
import { TotalPlayersComponent } from '../total-players/total-players.component';
import { MembersChartComponent } from '../members-chart/members-chart.component';
import { AnnualReportsComponent } from '../annual-reports/annual-reports.component';

const TABS = ['difficulty', 'players', 'memberships', 'reports'];

@Component({
    selector: 'app-stats-tabs',
    templateUrl: './stats-tabs.component.html',
    styleUrls: ['./stats-tabs.component.css'],
    imports: [
        CommonModule,
        RouterModule,
        MatTabsModule,
        LocalizePipe,
        DifficultyChartComponent,
        TermsComponent,
        TotalPlayersComponent,
        MembersChartComponent,
        AnnualReportsComponent
    ]
})
export class StatsTabsComponent extends RoutingTabsComponent {
  constructor(
    router: Router,
    route: ActivatedRoute,
    location: Location
  ) {
    super(router, route, location);
    this.tabs = TABS;
  }
}
