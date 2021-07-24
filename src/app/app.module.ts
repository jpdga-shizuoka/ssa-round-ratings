import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { ReloadComponent } from './app-reload';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { RoundsTableComponent } from './rounds-table/rounds-table.component';
import { TotalPlayersComponent } from './total-players/total-players.component';
import { VideosTableComponent } from './videos-table/videos-table.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventsMapComponent } from './events-map/events-map.component';
import { MarkerDialogComponent } from './dialogs/marker-dialog.component';
import { NoticeBottomsheetComponent } from './dialogs/notice-bottomsheet.component';
import { VideoBottomsheetComponent } from './dialogs/video-bottomsheet.component';
import { BottomSheetDetailDisabledComponent } from './dialogs/bottom-sheet-detail-disabled.component';
import { PrefaceComponent } from './preface/preface.component';
import { IcalenderComponent } from './icalendar/icalendar.component';
import { SsaHlaChartComponent } from './ssa-hla-chart/ssa-hla-chart.component';
import { SchedulePipe } from './schedule.pipe';
import { GeolinkPipe } from './geolink.pipe';
import { LocalizePipe } from './localize.pipe';
import { PeriodPipe } from './period.pipe';
import { LocationPipe } from './location.pipe';
import { EventPipe } from './event.pipe';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    ReloadComponent,
    RoundsTabsComponent,
    RoundsTableComponent,
    RoundDetailComponent,
    AboutThisSiteComponent,
    EventDetailComponent,
    EventsTabsComponent,
    EventsTableComponent,
    EventsMapComponent,
    NoticeBottomsheetComponent,
    VideoBottomsheetComponent,
    BottomSheetDetailDisabledComponent,
    MarkerDialogComponent,
    DashBoardComponent,
    TotalPlayersComponent,
    VideosTableComponent,
    StatsTabsComponent,
    PrefaceComponent,
    IcalenderComponent,
    SsaHlaChartComponent,
    SchedulePipe,
    GeolinkPipe,
    LocalizePipe,
    PeriodPipe,
    LocationPipe,
    EventPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    YouTubePlayerModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NgxChartsModule
  ],
  entryComponents: [
    NoticeBottomsheetComponent,
    BottomSheetDetailDisabledComponent,
    MarkerDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
