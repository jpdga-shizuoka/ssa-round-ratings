import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';
import { EventsTabsComponent } from './events-tabs.component';

const DISPLAYED_COLUMNS = [['location', 'day'], ['location', 'day', 'month']];
const TITLES = ['Local', 'Location'];
const TABS = ['events', 'locations'];

@Component({
  selector: 'app-monthly-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class MonthlyTabsComponent extends EventsTabsComponent {
  constructor(
    private bottomsheet: MatBottomSheet,
    route: ActivatedRoute,
    location: Location,
    breakpointObserver: BreakpointObserver
  ) {
    super(route, location, breakpointObserver);
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.titles = TITLES;
    this.tabs = TABS;
    this.category = 'monthly';
  }

  ngAfterViewInit(): void {
    if (sessionStorage.getItem('monthlyConfirmed') !== 'true') {
      this.openNoticeBottomsheet();
    }
  }

  private openNoticeBottomsheet(): void {
    const bottomsheetRef = this.bottomsheet.open(NoticeBottomsheetComponent);

    bottomsheetRef
      .afterDismissed()
      .subscribe(() => sessionStorage.setItem('monthlyConfirmed', 'true'));

    setTimeout(() => bottomsheetRef.dismiss(), 5000);
  }
}