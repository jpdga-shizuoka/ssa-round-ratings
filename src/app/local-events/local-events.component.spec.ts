import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { LocalEventsComponent } from './local-events.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';

describe('LocalEventsComponent', () => {
  let component: LocalEventsComponent;
  let fixture: ComponentFixture<LocalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocalEventsComponent,
        EventDetailComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatPaginatorModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
