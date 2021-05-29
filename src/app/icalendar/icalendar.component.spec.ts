import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcalenderComponent } from './icalendar.component';

describe('IcalenderComponent', () => {
  let component: IcalenderComponent;
  let fixture: ComponentFixture<IcalenderComponent>;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    declarations: [IcalenderComponent]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
