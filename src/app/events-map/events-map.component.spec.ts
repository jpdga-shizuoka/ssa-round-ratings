import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AgmCoreModule } from '@agm/core';

import { EventsMapComponent } from './events-map.component';
import { MarkerDialogComponent } from '../dialogs/marker-dialog.component';

describe('EventsMapComponent', () => {
  let component: EventsMapComponent;
  let fixture: ComponentFixture<EventsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventsMapComponent,
        MarkerDialogComponent
     ],
      imports: [
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
