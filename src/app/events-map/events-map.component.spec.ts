import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { EventsMapComponent } from './events-map.component';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';
import { LocalizePipe } from '../localize.pipe';

describe('EventsMapComponent', () => {
  let component: EventsMapComponent;
  let fixture: ComponentFixture<EventsMapComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      declarations: [
        EventsMapComponent,
        MarkerDialogComponent,
        LocalizePipe
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatListModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMapComponent);
    component = fixture.componentInstance;
    component.category = 'local';
    fixture.detectChanges();
  });

  it('should create', () => {
    return expect(component).toBeTruthy();
  });
});
