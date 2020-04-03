import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { VideosTableComponent } from './videos-table.component';

const VIDEOS = [{
  title: 'The 33rd Kyushu Open',
  subttl: 'Kyushu Open Digest',
  date: new Date('2019-10-13'),
  url: 'https://youtu.be/vToHZBT6Frc',
}];

describe('VideosTableComponent', () => {
  let component: VideosTableComponent;
  let fixture: ComponentFixture<VideosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ VideosTableComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatBottomSheetModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource(VIDEOS);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
