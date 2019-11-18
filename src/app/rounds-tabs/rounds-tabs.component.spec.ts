import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsTabsComponent } from './rounds-tabs.component';

describe('RoundsTabsComponent', () => {
  let component: RoundsTabsComponent;
  let fixture: ComponentFixture<RoundsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
