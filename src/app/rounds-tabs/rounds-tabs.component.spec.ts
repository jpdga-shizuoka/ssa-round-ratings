import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

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
    imports: [FormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatListModule,
        MatBottomSheetModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
