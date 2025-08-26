import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendPosition, Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { RemoteService } from '../remote.service';
import { TotalYearPlayers } from '../models';

interface ChartValue {
  name: string;
  value: number;
}

interface ChartData {
  name: string;
  series: ChartValue[];
}

@Component({
  selector: 'app-total-players',
  templateUrl: './total-players.component.html',
  styleUrls: ['./total-players.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ]
})
export class TotalPlayersComponent implements OnInit {
  chartSource?: ChartData[];
  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Year';
  yAxisLabel = 'Players';
  gradient = false;
  legend = false;
  legendPosition = LegendPosition.Below;
  showDataLabel = true;
  animations = true;
  colorScheme = {
    domain: ['#aaf255', '#61d800', '#008b00']
  } as Color;

  constructor(private readonly remote: RemoteService) {}

  ngOnInit(): void {
    this.remote.getPlayers()
      .subscribe(players => this.countPlayers(players));
  }

  private countPlayers(players: TotalYearPlayers[]) {
    const data: ChartData[] = [];
    players.forEach(yearTotal => {
      data.push({
        name: yearTotal.year.toString().slice(-2),
        series: [{
          name: 'Pro',
          value: yearTotal.players.pro
        }, {
          name: 'Ama',
          value: yearTotal.players.ama
        }, {
          name: 'Misc',
          value: yearTotal.players.misc
        }]
      });
    });
    this.chartSource = data;
  }
}
