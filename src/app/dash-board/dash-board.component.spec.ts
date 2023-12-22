import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { DashBoardComponent } from './dash-board.component';
import { VideosTableComponent } from '../videos-table/videos-table.component';
import { LocalizePipe } from '../localize.pipe';
import { LocationPipe } from '../location.pipe';
import { GeolinkPipe } from '../geolink.pipe';
import { SchedulePipe } from '../schedule.pipe';
import { PeriodPipe } from '../period.pipe';
import { EventPipe } from '../event.pipe';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DashBoardComponent,
        VideosTableComponent,
        LocalizePipe,
        LocationPipe,
        GeolinkPipe,
        SchedulePipe,
        PeriodPipe,
        EventPipe
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatBottomSheetModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    return expect(component).toBeTruthy();
  });
});
