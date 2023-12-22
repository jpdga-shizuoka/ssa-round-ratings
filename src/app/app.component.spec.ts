import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

import { AppComponent } from './app.component';
import { ReloadComponent } from './app-reload';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { RoundsTableComponent } from './rounds-table/rounds-table.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventsMapComponent } from './events-map/events-map.component';
import { JapanOpenComponent } from './japan-open/japan-open.component';
import { TotalPlayersComponent } from './total-players/total-players.component';
import { MarkerDialogComponent } from './dialogs/marker-dialog.component';
import { NoticeBottomsheetComponent } from './dialogs/notice-bottomsheet.component';
import { BottomSheetDetailDisabledComponent } from './dialogs/bottom-sheet-detail-disabled.component';
import { SchedulePipe } from './schedule.pipe';
import { GeolinkPipe } from './geolink.pipe';
import { LocalizePipe } from './localize.pipe';
import { PeriodPipe } from './period.pipe';
import { LocationPipe } from './location.pipe';
import { EventPipe } from './event.pipe';

import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        ReloadComponent,
        DashBoardComponent,
        RoundsTabsComponent,
        RoundsTableComponent,
        RoundDetailComponent,
        StatsTabsComponent,
        AboutThisSiteComponent,
        EventDetailComponent,
        EventsTabsComponent,
        EventsTableComponent,
        EventsMapComponent,
        JapanOpenComponent,
        TotalPlayersComponent,
        MarkerDialogComponent,
        NoticeBottomsheetComponent,
        BottomSheetDetailDisabledComponent,
        SchedulePipe,
        GeolinkPipe,
        LocalizePipe,
        PeriodPipe,
        LocationPipe,
        EventPipe
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        YouTubePlayerModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatChipsModule,
        MatSortModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatFormFieldModule,
        NgxChartsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance as AppComponent;
    return expect(app).toBeTruthy();
  });

  it('should have as title "DG Japan"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance as AppComponent;
    return expect(app.title).toEqual('DG Japan');
  });

  it('should render title in toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as Element;
    return expect(compiled.querySelector('.mat-toolbar span').textContent).toContain('DG Japan');
  });
});
