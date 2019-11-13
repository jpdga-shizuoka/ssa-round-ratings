import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { MonthlyEventsComponent } from './monthly-events.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

describe('MonthlyEventsComponent', () => {
  let component: MonthlyEventsComponent;
  let fixture: ComponentFixture<MonthlyEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthlyEventsComponent,
        EventDetailComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
