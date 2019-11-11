import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEventsComponent } from './monthly-events.component';

describe('MonthlyEventsComponent', () => {
  let component: MonthlyEventsComponent;
  let fixture: ComponentFixture<MonthlyEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyEventsComponent ]
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
