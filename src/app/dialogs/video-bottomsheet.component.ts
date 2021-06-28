import { Component, Inject, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DeviceDetectorService } from 'ngx-device-detector';

import { VideoInfo } from '../models';

const FACEBOOK = /https:\/\/www.facebook.com\/.+\/videos\/(\d+)\//;
const YOUTUBE = /https:\/\/www.youtube.com\/watch?v=([0-9a-zA-Z_-]+)/;
const YOUTUBE_SHORT = /https:\/\/youtu.be\/([0-9a-zA-Z_-]+)/;
const MAX_VIDEO_WIDTH = 640;
const VIDEO_SIDE_PADDING = 16;

@Component({
  selector: 'app-video-bottomsheet',
  templateUrl: './video-bottomsheet.component.html',
  styleUrls: ['./video-bottomsheet.component.css']
})
export class VideoBottomsheetComponent {
  @ViewChild('player') player!: YouTubePlayer;
  videoId: string | undefined = undefined;
  videoType: 'YT' | 'FB' | undefined = undefined;
  width: number;
  height: number;
  isMobile = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public video: VideoInfo,
    private deviceService: DeviceDetectorService,
    private bottomSheetRef: MatBottomSheetRef<VideoBottomsheetComponent>
  ) {
    const width = window.innerWidth - VIDEO_SIDE_PADDING * 2;
    this.width = Math.min(MAX_VIDEO_WIDTH, width);
    this.height = this.width / 16 * 9;

    this.bottomSheetRef.afterDismissed().subscribe(() => {
      this.videoId = undefined;
    });

    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    }

    let result: string[] | null;
    result = FACEBOOK.exec(this.video.url);
    if (result != null) {
      this.videoType = 'FB';
      this.videoId = result[0];
      return;
    }
    result = YOUTUBE.exec(this.video.url);
    if (result != null) {
      this.videoType = 'YT';
      this.videoId = result[1];
      return;
    }
    result = YOUTUBE_SHORT.exec(this.video.url);
    if (result != null) {
      this.videoType = 'YT';
      this.videoId = result[1];
    }
  }

  get year(): number {
    return this.video.date.getFullYear();
  }

  get event(): string {
    return this.video.title;
  }

  get title(): string {
    return this.video.subttl;
  }

  get isYoutubeVideo(): boolean {
    return this.videoType === 'YT';
  }

  //
  // https://developers.google.com/youtube/iframe_api_reference#Playback_status
  //
  onStateChange(event: { data?: number; }): void {
    if (event?.data === 0) {
      this.bottomSheetRef.dismiss();
    }
  }

  //
  //  @see https://developers.google.com/youtube/iframe_api_reference#Events
  //
  onReady(): void {
    this.player.playVideo();
  }
}
