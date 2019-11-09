import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from "@angular/router/testing";

import { EventDetailComponent } from './event-detail.component';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    component.event = {
      "title": "The 9th Okinawa Open",
      "location": "Nakijinson Sport Park",
      "period": {
        "from": "2020-02-15",
        "to": "2020-02-16"
      },
      "jpdga": {
        "eventId": "521"
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
