import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';

import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';
import { EventsTabsComponent } from './events-tabs.component';
import { MonthlyTableComponent } from '../events-table/monthly-table.component';
import { EventsMapComponent } from '../events-map/events-map.component';
import { LocalizePipe } from '../localize.pipe';

const DISPLAYED_COLUMNS = [['location', 'day'], ['location', 'day', 'month']];
const TITLES = ['Monthly', 'Location'];
const TABS = ['events', 'locations'];

@Component({
    selector: 'app-monthly-tabs',
    templateUrl: './monthly-tabs.component.html',
    styleUrls: ['./events-tabs.component.css'],
    imports: [
    RouterModule,
    MatBottomSheetModule,
    MatTabsModule,
    MonthlyTableComponent,
    EventsMapComponent,
    LocalizePipe
]
})
export class MonthlyTabsComponent extends EventsTabsComponent {
  private ss?: Subscription;

  constructor(
    private bottomsheet: MatBottomSheet,
    router: Router,
    route: ActivatedRoute,
    location: Location,
    breakpointObserver: BreakpointObserver
  ) {
    super(router, route, location, breakpointObserver);
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.titles = TITLES;
    this.tabs = TABS;
    this.category = 'monthly';
  }

  ngAfterViewInit(): void {
    if (sessionStorage.getItem('monthlyConfirmed') !== 'true') {
      this.ss = this.openNoticeBottomsheet();
    }
  }

  override ngOnDestroy(): void {
    this.ss?.unsubscribe();
    super.ngOnDestroy();
  }

  private openNoticeBottomsheet() {
    const bottomsheetRef = this.bottomsheet.open(NoticeBottomsheetComponent);
    setTimeout(() => bottomsheetRef.dismiss(), 5000);
    return bottomsheetRef
      .afterDismissed()
      .subscribe(() => sessionStorage.setItem('monthlyConfirmed', 'true'));
  }
}
