import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPlayersComponent } from './total-players.component';

describe('TotalPlayersComponent', () => {
  let component: TotalPlayersComponent;
  let fixture: ComponentFixture<TotalPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
