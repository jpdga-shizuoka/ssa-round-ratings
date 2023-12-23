import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AboutThisSiteComponent } from './about-this-site.component';
import { LocalizePipe } from '../localize.pipe';

describe('AboutThisSiteComponent', () => {
  let component: AboutThisSiteComponent;
  let fixture: ComponentFixture<AboutThisSiteComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      declarations: [
        AboutThisSiteComponent,
        LocalizePipe
      ],
      imports: [
        MatIconModule,
        MatCardModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutThisSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    return expect(component).toBeTruthy();
  });
});
