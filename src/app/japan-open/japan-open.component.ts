import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService } from '../common.service';
import { VideoInfo } from '../models';

@Component({
  selector: 'app-japan-open',
  templateUrl: './japan-open.component.html',
  styleUrls: ['./japan-open.component.css']
})
export class JapanOpenComponent implements OnInit {

  videosSource: MatTableDataSource<VideoInfo>;

  constructor(
    private cs: CommonService,
  ) { }

  get geolocation(): string {
    return this.cs.getGeolocation('fukui country club');
  }

  ngOnInit(): void {
    this.videosSource = new MatTableDataSource<VideoInfo>();
    setTimeout(() => {
      const list = this.cs.getVideoList('japan open');
      this.videosSource.data = list;
    });
  }
}
