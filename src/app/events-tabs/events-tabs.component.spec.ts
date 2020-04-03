import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EventsTabsComponent } from './events-tabs.component';
import { EventsTableComponent } from '../events-table/events-table.component';
import { EventsMapComponent } from '../events-map/events-map.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { NoticeBottomsheetComponent } from '../dialogs/notice-bottomsheet.component';

import { AgmCoreModule } from '@agm/core';

describe('EventsTabsComponent', () => {
  let component: EventsTabsComponent;
  let fixture: ComponentFixture<EventsTabsComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        EventsTabsComponent,
        EventsTableComponent,
        EventsMapComponent,
        EventDetailComponent,
        NoticeBottomsheetComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'events/local', component: EventsTabsComponent}]
        ),
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatFormFieldModule,
        MatInputModule,
        AgmCoreModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
      const router: Router = TestBed.get(Router);
      fixture = TestBed.createComponent(EventsTabsComponent);
      fixture.detectChanges();
      return router.navigate(['/events/local']);
  });

  xit('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
