import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ScriptLoaderService } from '../script-loader.service';

import { MiscInfo } from '../models';
import { VideoBottomsheetComponent } from '../dialogs/video-bottomsheet.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  @Input() list!: MiscInfo[];

  constructor(
    private bottomSheet: MatBottomSheet,
    private scriptLoader: ScriptLoaderService
    ) {}

  ngOnInit(): void {
    this.scriptLoader.youtube();
  }

  onRawClicked(video: MiscInfo): void {
    this.openVideoSheet(video);
  }

  private openVideoSheet(video: MiscInfo) {
    this.bottomSheet.open(VideoBottomsheetComponent, {
      data: video
    });
  }
}
