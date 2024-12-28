import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';

import { RemoteService, Members, Organization } from '../remote.service';
import { CData } from '../ngx-charts';

type Orgs = {
  pdga: Members[];
  jpdga: Members[];
};

function members2cdata(org: Organization, members: Members[]): CData {
  const data: CData = {
    name: org,
    series: []
  };
  members.forEach(item => {
    data.series.push({
      name: item.year.toString(),
      value: item.members
    });
  });
  return data;
}

function calcScaleMax(orgs: Orgs): number {
  let result = 0;
  orgs.pdga.forEach(org => { result = Math.max(result, org.members)});
  orgs.jpdga.forEach(org => { result = Math.max(result, org.members) });
  return Math.ceil(result / 50) * 50;
}

@Component({
  selector: 'app-members-chart',
  templateUrl: './members-chart.component.html',
  styleUrls: ['./members-chart.component.css']
})
export class MembersChartComponent implements OnInit {
  chartSource?: CData[];
  yScaleMax = 0;
  legendTitle = '';
  yAxisLabel = 'Members';
  view = [400, 400] as [number, number];
  legendPosition = LegendPosition.Below;

  constructor(private readonly remote: RemoteService) { }

  ngOnInit(): void {
    forkJoin({
      pdga: this.remote.getMembers('PDGA'),
      jpdga: this.remote.getMembers('JPDGA')
    }).subscribe(results => this.addOrgs(results));
  }

  private addOrgs(orgs: Orgs) {
    this.yScaleMax = calcScaleMax(orgs);
    console.log(this.yScaleMax)
    this.chartSource = [
      members2cdata('PDGA', orgs.pdga),
      members2cdata('JPDGA', orgs.jpdga)
    ]
  }
}
