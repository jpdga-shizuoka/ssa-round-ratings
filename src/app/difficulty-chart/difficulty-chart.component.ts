import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, first } from 'rxjs/operators';

import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { calcRoundStat } from '../app-libs';
import { rounds2result } from './difficulty-chart.lib';
import { ChartDataExt, BubbleData } from './ngx-charts.interfaces';

@Component({
  selector: 'app-difficulty-chart',
  templateUrl: './difficulty-chart.component.html',
  styleUrls: ['./difficulty-chart.component.css']
})
export class DifficultyChartComponent implements OnInit {
  rounds?: ChartDataExt[];
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'HLA';
  yAxisLabel = 'SSA';
  xScaleMin?: number;
  xScaleMax?: number;
  yScaleMin?: number;
  yScaleMax?: number;

  constructor(
    private router: Router,
    private localize: LocalizeService,
    private remote: RemoteService
  ) {
  }

  ngOnInit(): void {
    this.remote.getRounds().pipe(
      first(),
      map(rounds => rounds.filter(round => round.hla != null && round.hla)),
      map(rounds => calcRoundStat(rounds)),
      map(rounds => rounds.filter(round => round.ssa != null)),
      map(rounds => rounds2result(rounds, this.localize))
    ).subscribe(result => {
      this.xScaleMin = result.hla.min;
      this.xScaleMax = result.hla.max;
      this.yScaleMin = result.ssa.min;
      this.yScaleMax = result.ssa.max;
      this.rounds = result.data;
    });
  }

  onClickItem(event: BubbleData): void {
    console.log('onClickItem', event);
    this.router.navigate(['/event', event.series.eventId]);
  }
}
