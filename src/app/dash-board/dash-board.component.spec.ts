import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

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
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        DashBoardComponent,
        VideosTableComponent,
        LocalizePipe,
        LocationPipe,
        GeolinkPipe,
        SchedulePipe,
        PeriodPipe,
        EventPipe,
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
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
