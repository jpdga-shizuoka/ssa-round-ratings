import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { environment } from '../environments/environment';

@NgModule({
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
    NoticeBottomsheetComponent,
    MarkerDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
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
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatBottomSheetModule,
    AgmCoreModule.forRoot({ apiKey: environment.MAP_API_KEY }),
  ],
  entryComponents: [
    NoticeBottomsheetComponent,
    MarkerDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
