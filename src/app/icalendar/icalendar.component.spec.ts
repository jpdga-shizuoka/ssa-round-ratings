import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcalenderComponent } from './icalendar.component';

describe('IcalenderComponent', () => {
  let component: IcalenderComponent;
  let fixture: ComponentFixture<IcalenderComponent>;

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [IcalenderComponent]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
