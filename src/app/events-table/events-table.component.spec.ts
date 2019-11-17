import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { Observable, of } from 'rxjs';

import { EventsTableComponent } from './events-table.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

const EVENTS = [{
  "title": "The 2020 Doubles Japan Championship",
  "location": "Hitachi Seaside Park",
  "period": {
    "from": "2020-02-29",
    "to": "2020-03-01"
  },
  "jpdga": {
    "eventId": "522"
  }
}];

describe('EventsTableComponent', () => {
  let component: EventsTableComponent;
  let fixture: ComponentFixture<EventsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventsTableComponent,
        EventDetailComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource(EVENTS);
    component.displayedColumns$ = of(['date', 'title', 'location']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
