import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RoundDetailComponent } from './round-detail.component';
import { GeolinkPipe } from '../geolink.pipe';
import { LocalizePipe } from '../localize.pipe';
import { PeriodPipe } from '../period.pipe';

describe('RoundDetailComponent', () => {
  let component: RoundDetailComponent;
  let fixture: ComponentFixture<RoundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        RoundDetailComponent,
        GeolinkPipe,
        LocalizePipe,
        PeriodPipe,
      ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundDetailComponent);
    component = fixture.componentInstance;
    component.round = {
      id: 'the18thchubuopen.rd1rd2rd3',
      event: 'the18thchubuopen',
      round: 'Rd1,Rd2,Rd3',
      eventTitle: 'The 18th Chubu Open',
      locationTitle: 'Mikawa Rinkai Ryokuchi',
      date: '2018-12-15',
      hla: 97,
      holes: 18,
      ratings: {
          player1: {
              score: 62,
              rating: 1008
          },
          player2: {
              score: 79,
              rating: 886
          }
      },
      ssa: 56,
      weight: -10,
      offset: 1500,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
