import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { VideoInfo } from '../models';

const FACEBOOK = /https:\/\/www.facebook.com\/.+\/videos\/(\d+)\//;
const YOUTUBE = /https:\/\/youtu.be\/([0-9a-zA-Z]+)/

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy {
  @Input() video: VideoInfo;
  videoId: string | undefined = undefined;
  videoType: 'YT' | 'FB' | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
    let result: string[] | null;
    if ((result = this.video.url.match(FACEBOOK)) != null) {
      this.videoType = 'FB';
      this.videoId = result[0];
    }
    else if ((result = this.video.url.match(YOUTUBE)) != null) {
        this.videoType = 'YT';
        this.videoId = result[1];
    }
    console.log('OnInit', this.videoType, this.videoId);
  }

  ngOnDestroy() {
    console.log('OnDestroy', this.videoId);
  }

  get isYoutubeVideo(): boolean {
    return this.videoType === 'YT';
  }
}
