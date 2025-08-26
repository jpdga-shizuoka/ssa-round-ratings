import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import {YouTubePlayer, YOUTUBE_PLAYER_CONFIG} from '@angular/youtube-player';
import { DeviceDetectorService } from 'ngx-device-detector';

import { MiscInfo } from '../models';
import { LocalizePipe } from '../localize.pipe';

const FACEBOOK = /https:\/\/www\.facebook\.com\/.+\/videos\/(\d+)\//;
const YOUTUBE = /https:\/\/youtube\.com\/watch\?v=([0-9a-zA-Z_-]+)/;
const YOUTUBE_SHORT = /https:\/\/youtu\.be\/([0-9a-zA-Z_-]+)/;

const DEFAULT_PLAYER_WIDTH = 640;
const DEFAULT_PLAYER_HEIGHT = 390;
const PLAYER_RATIO = DEFAULT_PLAYER_HEIGHT / DEFAULT_PLAYER_WIDTH;
const VIDEO_PADINGS = 16 * 2;

@Component({
    selector: 'app-video-bottomsheet',
    templateUrl: './video-bottomsheet.component.html',
    styleUrls: ['./video-bottomsheet.component.css'],
    imports: [
        CommonModule,
        YouTubePlayer,
        MatIconModule,
        LocalizePipe
    ],
    providers: [{
            provide: YOUTUBE_PLAYER_CONFIG,
            useValue: {
                loadApi: false
            }
        }]
})
export class VideoBottomsheetComponent implements OnInit {
  videoId: string | undefined = undefined;
  videoType: 'YT' | 'FB' | undefined = undefined;
  isMobile = false;
  videoWidth = DEFAULT_PLAYER_WIDTH;
  videoHeight = DEFAULT_PLAYER_HEIGHT;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public video: MiscInfo,
    private deviceService: DeviceDetectorService,
    private bottomSheetRef: MatBottomSheetRef<VideoBottomsheetComponent>
  ) {
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
      return;
    }
  }

  get year(): number | string {
    return this.video.date?.getFullYear() ?? '';
  }

  get event(): string {
    return this.video.title;
  }

  get title(): string {
    return this.video.subttl ?? '';
  }

  get isYoutubeVideo(): boolean {
    return this.videoType === 'YT';
  }

  ngOnInit() {
    this.updateVideoWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateVideoWidth();
  }

  //
  // https://developers.google.com/youtube/iframe_api_reference#Playback_status
  //
  onStateChange(event: { data?: number; }): void {
    if (event?.data === 0) {
      this.bottomSheetRef.dismiss();
    }
  }

  private updateVideoWidth() {
    this.videoWidth = Math.min(window.innerWidth - VIDEO_PADINGS, DEFAULT_PLAYER_WIDTH);
    this.videoHeight = this.videoWidth * PLAYER_RATIO;
  }
}
