import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatsTabsComponent } from './stats-tabs.component';
import { TotalPlayersComponent } from '../total-players/total-players.component';
import { LocalizePipe } from '../localize.pipe';

describe('StatsTabsComponent', () => {
  let component: StatsTabsComponent;
  let fixture: ComponentFixture<StatsTabsComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        StatsTabsComponent,
        TotalPlayersComponent,
        LocalizePipe
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxChartsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    return expect(component).toBeTruthy();
  });
});
