import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { RoundsTableComponent } from './rounds-table/rounds-table.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventsMapComponent, MarkerDialogComponent } from './events-map/events-map.component';
import { NoticeBottomsheetComponent } from './dialogs/notice-bottomsheet.component';

import { AgmCoreModule } from '@agm/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RoundsTabsComponent,
        RoundsTableComponent,
        RoundDetailComponent,
        AboutThisSiteComponent,
        EventDetailComponent,
        EventsTabsComponent,
        EventsTableComponent,
        EventsMapComponent,
        MarkerDialogComponent,
        NoticeBottomsheetComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatChipsModule,
        MatSortModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatDialogModule,
        AgmCoreModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  xit(`should have as title 'DG Japan'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DG Japan');
  });

  xit('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ratings!');
  });
});
