import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DeviceDetectorService } from 'ngx-device-detector';

import { MiscInfo } from '../models';

const FACEBOOK = /https:\/\/www\.facebook\.com\/.+\/videos\/(\d+)\//;
const YOUTUBE = /https:\/\/youtube\.com\/watch\?v=([0-9a-zA-Z_-]+)/;
const YOUTUBE_SHORT = /https:\/\/youtu\.be\/([0-9a-zA-Z_-]+)/;

@Component({
  selector: 'app-video-bottomsheet',
  templateUrl: './video-bottomsheet.component.html',
  styleUrls: ['./video-bottomsheet.component.css']
})
export class VideoBottomsheetComponent {
  videoId: string | undefined = undefined;
  videoType: 'YT' | 'FB' | undefined = undefined;
  isMobile = false;

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

  //
  // https://developers.google.com/youtube/iframe_api_reference#Playback_status
  //
  onStateChange(event: { data?: number; }): void {
    if (event?.data === 0) {
      this.bottomSheetRef.dismiss();
    }
  }
}
