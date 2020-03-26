import { Component, OnInit, Input } from '@angular/core';

import { VideoInfo } from '../models';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  @Input() video: VideoInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
