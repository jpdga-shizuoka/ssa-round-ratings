import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { DeviceDetectorService } from 'ngx-device-detector';

import { CommonService } from '../common.service';
import { VideoInfo } from '../models';

const FACEBOOK = /https:\/\/www.facebook.com\/.+\/videos\/(\d+)\//;
const YOUTUBE = /https:\/\/www.youtube.com\/watch?v=([0-9a-zA-Z_\-]+)/;
const YOUTUBE_SHORT = /https:\/\/youtu.be\/([0-9a-zA-Z_\-]+)/;


@Component({
  selector: 'app-video-bottomsheet',
  templateUrl: './video-bottomsheet.component.html',
  styleUrls: ['./video-bottomsheet.component.css']
})
export class VideoBottomsheetComponent {
  videoId: string | undefined = undefined;
  videoType: 'YT' | 'FB' | undefined = undefined;
  width = 640;
  height = 390;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public video: VideoInfo,
    private deviceService: DeviceDetectorService,
    private bottomSheetRef: MatBottomSheetRef<VideoBottomsheetComponent>,
    private cs: CommonService,
  ) {
    this.bottomSheetRef.afterDismissed().subscribe(() => {
      this.videoId = undefined;
    });

    if (this.deviceService.isMobile()) {
      this.width = 320;
      this.height = 195;
    }

    let result: string[] | null;
    result = this.video.url.match(FACEBOOK);
    if (result != null) {
      this.videoType = 'FB';
      this.videoId = result[0];
      return;
    }
    result = this.video.url.match(YOUTUBE);
    if (result != null) {
      this.videoType = 'YT';
      this.videoId = result[1];
      return;
    }
    result = this.video.url.match(YOUTUBE_SHORT);
    if (result != null) {
      this.videoType = 'YT';
      this.videoId = result[1];
      return;
    }
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
}
