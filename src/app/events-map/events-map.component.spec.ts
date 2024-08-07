import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

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
    imports: [MatDialogModule,
        MatListModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
