import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TotalPlayersComponent } from './total-players.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LocalizePipe } from '../localize.pipe';

describe('TotalPlayersComponent', () => {
  let component: TotalPlayersComponent;
  let fixture: ComponentFixture<TotalPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        TotalPlayersComponent,
        LocalizePipe,
      ],
      imports: [
        NoopAnimationsModule,
        NgxChartsModule,
        HttpClientModule,
      ]
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
