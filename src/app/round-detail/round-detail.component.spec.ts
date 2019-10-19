import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { RoundDetailComponent } from './round-detail.component';

describe('RoundDetailComponent', () => {
  let component: RoundDetailComponent;
  let fixture: ComponentFixture<RoundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundDetailComponent ],
      imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
