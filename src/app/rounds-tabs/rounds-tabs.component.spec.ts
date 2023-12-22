import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { EventsMapComponent } from '../events-map/events-map.component';
import { RoundDetailComponent } from '../round-detail/round-detail.component';
import { RoundsTableComponent } from '../rounds-table/rounds-table.component';
import { VideosTableComponent } from '../videos-table/videos-table.component';
import { BottomSheetDetailDisabledComponent } from '../dialogs/bottom-sheet-detail-disabled.component';
import { RoundsTabsComponent } from './rounds-tabs.component';
import { LocalizePipe } from '../localize.pipe';
import { EventPipe } from '../event.pipe';
import { LocationPipe } from '../location.pipe';
import { GeolinkPipe } from '../geolink.pipe';
import { SchedulePipe } from '../schedule.pipe';
import { PeriodPipe } from '../period.pipe';

describe('RoundsTabsComponent', () => {
  let component: RoundsTabsComponent;
  let fixture: ComponentFixture<RoundsTabsComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        RoundsTabsComponent,
        RoundsTableComponent,
        EventsMapComponent,
        VideosTableComponent,
        RoundDetailComponent,
        BottomSheetDetailDisabledComponent,
        LocalizePipe,
        EventPipe,
        LocationPipe,
        GeolinkPipe,
        SchedulePipe,
        PeriodPipe
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatListModule,
        MatBottomSheetModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    return expect(component).toBeTruthy();
  });
});
