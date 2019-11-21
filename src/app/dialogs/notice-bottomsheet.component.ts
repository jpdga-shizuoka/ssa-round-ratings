import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

import { CommonService } from '../common.service';

export interface NoticeBottomsheetData {
  title: string;
  content: string;
}

const MONTHLY_DIALOG_TITLE = [
  'Regarding the monthly schedule',
  '月例会のスケジュールについて'
];
const MONTHLY_DIALOG_CONTENT = [
  'This is just an annual schedule, please check in advance if you want to entry.',
  'ここに揚げたスケジュールはおおよその予定です。参加される際は事前に主催者等へのご確認を願います。'
];

@Component({
  selector: 'app-notice-bottomsheet',
  templateUrl: './notice-bottomsheet.component.html',
  styleUrls: ['./notice-bottomsheet.component.css']
})
export class NoticeBottomsheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: NoticeBottomsheetData,
    private bottomSheetRef: MatBottomSheetRef<NoticeBottomsheetComponent>,
    private cs: CommonService,
  ) {
  }

  get title() {
    return MONTHLY_DIALOG_TITLE[this.cs.primaryLanguage ? 0 : 1];
  }

  get content() {
    return MONTHLY_DIALOG_CONTENT[this.cs.primaryLanguage ? 0 : 1];
  }
}
