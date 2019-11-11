import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { MonthlyDetailComponent } from './monthly-detail.component';

describe('MonthlyDetailComponent', () => {
  let component: MonthlyDetailComponent;
  let fixture: ComponentFixture<MonthlyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDetailComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDetailComponent);
    component = fixture.componentInstance;
    component.event = {
      title: 'Ryugasaki',
      location: 'Furusato Fureai Park',
      schedule: {
        byDay: ['su'],
        bySetPos: 1,
        byMonth: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      },
      urls: [{
        type: 'website',
        title: 'Discgolf Ryugasaki',
        url: 'https://discgolf.exblog.jp'
      }, {
        type: 'website',
        title: 'Facebook',
        url: 'https://www.facebook.com/groups/237882656402120/'
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
