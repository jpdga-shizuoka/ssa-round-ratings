import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AgmCoreModule } from '@agm/core';

import { EventsMapComponent } from './events-map.component';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';
import { LocalizePipe } from '../localize.pipe';

describe('EventsMapComponent', () => {
  let component: EventsMapComponent;
  let fixture: ComponentFixture<EventsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventsMapComponent,
        MarkerDialogComponent,
        LocalizePipe,
     ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatListModule,
        AgmCoreModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMapComponent);
    component = fixture.componentInstance;
    component.category = 'local';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
