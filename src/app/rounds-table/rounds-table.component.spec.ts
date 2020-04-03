import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { Subject, of } from 'rxjs';

import { EventDetailComponent } from '../event-detail/event-detail.component';
import { RoundDetailComponent } from '../round-detail/round-detail.component';
import { RoundsTableComponent } from './rounds-table.component';
import { GeoMarker } from '../models';

const ROUNDS = [{
  event: 'The 19th Tohoku Open',
  round: 'Rd1',
  date: '2019-10-13',
  hla: 93,
  holes: 18,
  ratings: {
    player1: {
      score: 59,
      rating: 999
    },
    player2: {
      score: 72,
      rating: 893
    }
  }
}];

describe('RoundsTableComponent', () => {
  let component: RoundsTableComponent;
  let fixture: ComponentFixture<RoundsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        RoundsTableComponent,
        RoundDetailComponent,
        EventDetailComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatBottomSheetModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource(ROUNDS);
    component.displayedColumns$ = of(['year', 'event', 'round', 'hla', 'ssa']);
    component.markerSelected$ = new Subject<GeoMarker>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
