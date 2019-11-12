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

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PastRoundsComponent } from './past-rounds/past-rounds.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MonthlyEventsComponent } from './monthly-events/monthly-events.component';
import { MonthlyDetailComponent } from './monthly-detail/monthly-detail.component';
import { LocalEventsComponent } from './local-events/local-events.component';

@NgModule({
  declarations: [
    AppComponent,
    PastRoundsComponent,
    RoundDetailComponent,
    AboutThisSiteComponent,
    UpcomingEventsComponent,
    EventDetailComponent,
    MonthlyEventsComponent,
    MonthlyDetailComponent,
    LocalEventsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
