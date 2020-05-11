import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RemoteService, LocationInfo, Subscription } from '../remote.service';

@Component({
  selector: 'app-japan-open',
  templateUrl: './japan-open.component.html',
  styleUrls: ['./japan-open.component.css']
})
export class JapanOpenComponent implements OnInit, OnDestroy {
  private ssLocation?: Subscription;
  location: LocationInfo;

  constructor(private readonly remote: RemoteService) { }

  ngOnInit() {
    this.ssLocation = this.remote.getLocation('fukuicountryclub')
      .subscribe(location => this.location = location);
  }

  ngOnDestroy() {
    this.ssLocation?.unsubscribe();
  }
}
