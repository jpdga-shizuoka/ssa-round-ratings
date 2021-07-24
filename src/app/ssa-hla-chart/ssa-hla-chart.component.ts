import { Component, OnInit } from '@angular/core';
import { map, first } from 'rxjs/operators';

import { RemoteService } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { calcRoundStat } from '../app-libs';
import { BubbleDataResult, BubbleData, rounds2result } from './ssa-hla-chart.lib';

@Component({
  selector: 'app-ssa-hla-chart',
  templateUrl: './ssa-hla-chart.component.html',
  styleUrls: ['./ssa-hla-chart.component.css']
})
export class SsaHlaChartComponent implements OnInit {
  rounds?: BubbleData[];
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'HLA (meter)';
  yAxisLabel = 'SSA';
  xScaleMin = 70;
  xScaleMax = 150;
  yScaleMin = 45;
  yScaleMax = 70;

  constructor(
    private readonly localize: LocalizeService,
    private readonly remote: RemoteService
  ) {
  }

  ngOnInit(): void {
    let result: BubbleDataResult;
    this.remote.getRounds().pipe(
      first(),
      map(rounds => rounds.filter(round => round.hla != null && round.hla)),
      map(rounds => calcRoundStat(rounds)),
      map(rounds => rounds.filter(round => round.ssa != null)),
      map(rounds => rounds2result(rounds))
    ).subscribe(result => {
      this.xScaleMin = result.hla.min;
      this.xScaleMax = result.hla.max;
      this.yScaleMin = result.ssa.min;
      this.yScaleMax = result.ssa.max;
      this.rounds = result.data;
    })
  }
}
