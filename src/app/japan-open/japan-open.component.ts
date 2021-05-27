import { Component, OnInit } from '@angular/core';
import { RemoteService, LocationInfo } from '../remote.service';

@Component({
  selector: 'app-japan-open',
  templateUrl: './japan-open.component.html',
  styleUrls: ['./japan-open.component.css']
})
export class JapanOpenComponent implements OnInit {
  location: LocationInfo;

  constructor(private readonly remote: RemoteService) { }

  ngOnInit() {
    this.remote.getLocation('fukuicountryclub')
      .subscribe(location => this.location = location);
  }
}
