import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { map } from 'rxjs/operators';

import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { calcRoundStat } from '../libs';
import { rounds2result, reorder } from './difficulty-chart.lib';
import { ChartDataExt, BubbleData, EventId } from './ngx-charts.interfaces';
import { BubbleChartInteractiveComponent } from './custom-chart/bubble-chart-interactive.component';

@Component({
    selector: 'app-difficulty-chart',
    templateUrl: './difficulty-chart.component.html',
    styleUrls: ['./difficulty-chart.component.css'],
    imports: [
        CommonModule,
        NgxChartsModule,
        BubbleChartInteractiveComponent
    ]
})
export class DifficultyChartComponent implements OnInit {
  @Input() eventId?: EventId;
  @Input() tooltipDisabled = false;

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
      map(rounds => rounds.filter(round => round.hla != null && round.hla)),
      map(rounds => calcRoundStat(rounds)),
      map(rounds => rounds.filter(round => round.ssa != null)),
      map(rounds => rounds2result(rounds, this.localize))
    ).subscribe(result => {
      this.xScaleMin = result.hla.min;
      this.xScaleMax = result.hla.max;
      this.yScaleMin = result.ssa.min;
      this.yScaleMax = result.ssa.max;
      this.rounds = reorder(result.data, this.eventId);
    });
  }

  onClickItem(event: BubbleData): void {
    this.router.navigate(['/event', event.series.eventId]);
  }
}
