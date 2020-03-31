import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RoundDetailComponent } from './round-detail.component';

describe('RoundDetailComponent', () => {
  let component: RoundDetailComponent;
  let fixture: ComponentFixture<RoundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundDetailComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
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
    component.round = {
      event: 'The 18th Chubu Open',
      round: 'Rd1,Rd2,Rd3',
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
