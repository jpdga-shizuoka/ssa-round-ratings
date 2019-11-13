import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { PastRoundsComponent } from './past-rounds.component';
import { RoundDetailComponent } from '../round-detail/round-detail.component';

describe('PastRoundsComponent', () => {
  let component: PastRoundsComponent;
  let fixture: ComponentFixture<PastRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PastRoundsComponent,
        RoundDetailComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatChipsModule,
        MatSortModule,
        MatButtonModule,
        MatTabsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
