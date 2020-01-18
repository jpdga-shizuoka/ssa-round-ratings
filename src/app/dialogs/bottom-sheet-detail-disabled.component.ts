import { Component, Inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

import { CommonService } from '../common.service';

export interface NoticeBottomsheetData {
  title: string;
  content: string;
}

const DIALOG_TITLE = [
  'Can\'t display the detail',
  '詳細を表示できません'
];
const DIALOG_DESCRIPTION = [
  'Disabled expansion when sorting after filtering has been executed. Please sorting first, then do filtering, instead.',
  '諸事情により(^^; フィルタで範囲を絞り、ソートし、その後詳細表示を行うことはできません。代替手段として最初にソートしてからフィルタでの絞り込みをお願いします'
];

@Component({
  templateUrl: 'bottom-sheet-detail-disabled.component.html',
})
export class BottomSheetDetailDisabledComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: NoticeBottomsheetData,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetDetailDisabledComponent>,
    private cs: CommonService,
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  get title() {
    return DIALOG_TITLE[this.cs.primaryLanguage ? 0 : 1];
  }

  get description() {
    return DIALOG_DESCRIPTION[this.cs.primaryLanguage ? 0 : 1];
  }
}
