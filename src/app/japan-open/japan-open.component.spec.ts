import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { JapanOpenComponent } from './japan-open.component';
import { VideosTableComponent } from '../videos-table/videos-table.component';

describe('JapanOpenComponent', () => {
  let component: JapanOpenComponent;
  let fixture: ComponentFixture<JapanOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JapanOpenComponent,
        VideosTableComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatBottomSheetModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JapanOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
