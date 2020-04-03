import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTabsComponent } from './stats-tabs.component';

describe('StatsTabsComponent', () => {
  let component: StatsTabsComponent;
  let fixture: ComponentFixture<StatsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
