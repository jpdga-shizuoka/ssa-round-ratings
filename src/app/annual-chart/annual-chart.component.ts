import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteService, AnnualReport } from '../remote.service';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.css']
})
export class AnnualChartComponent implements OnInit {
  
  reports$?: Observable<AnnualReport[]>;

  constructor(private readonly remote: RemoteService) { }

  ngOnInit(): void {
    this.reports$ = this.remote.getAnnualReports();
  }

}
