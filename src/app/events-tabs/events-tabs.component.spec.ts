import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { EventsTabsComponent } from './events-tabs.component';
import { EventsTableComponent } from '../events-table/events-table.component';
import { EventsMapComponent } from '../events-map/events-map.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';
import { LocalizePipe } from '../localize.pipe';
import { LocationPipe } from '../location.pipe';
import { GeolinkPipe } from '../geolink.pipe';
import { SchedulePipe } from '../schedule.pipe';
import { PeriodPipe } from '../period.pipe';
import { EventPipe } from '../event.pipe';

describe('EventsTabsComponent', () => {
  let component: EventsTabsComponent;
  let fixture: ComponentFixture<EventsTabsComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        EventsTabsComponent,
        EventsTableComponent,
        EventsMapComponent,
        EventDetailComponent,
        NoticeBottomsheetComponent,
        LocalizePipe,
        LocationPipe,
        GeolinkPipe,
        SchedulePipe,
        PeriodPipe,
        EventPipe
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'events/local', component: EventsTabsComponent }]
        ),
        NoopAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
      ],
      // https://gist.github.com/benjamincharity/3d25cd2c95b6ecffadb18c3d4dbbd80b
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            url: [{ path: 'events' }, { path: 'local' }]
          }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTabsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    component = fixture.componentInstance;
    return expect(component).toBeTruthy();
  });
});
