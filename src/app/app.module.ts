import { NgModule, isDevMode } from '@angular/core';
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
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { ReloadComponent } from './app-reload';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { RoundsTableComponent } from './rounds-table/rounds-table.component';
import { TotalPlayersComponent } from './total-players/total-players.component';
import { VideosTableComponent } from './videos-table/videos-table.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LocalTabsComponent } from './events-tabs/local-tabs.component';
import { MonthlyTabsComponent } from './events-tabs/monthly-tabs.component';
import { UpcomingTabsComponent } from './events-tabs/upcoming-tabs.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { LocalTableComponent } from './events-table/local-table.component';
import { MonthlyTableComponent } from './events-table/monthly-table.component';
import { EventsMapComponent } from './events-map/events-map.component';
import { MarkerDialogComponent } from './dialogs/marker-dialog.component';
import { NoticeBottomsheetComponent } from './dialogs/notice-bottomsheet.component';
import { VideoBottomsheetComponent } from './dialogs/video-bottomsheet.component';
import { BottomSheetDetailDisabledComponent } from './dialogs/bottom-sheet-detail-disabled.component';
import { PrefaceComponent } from './preface/preface.component';
import { IcalenderComponent } from './icalendar/icalendar.component';
import { DifficultyChartComponent } from './difficulty-chart/difficulty-chart.component';
import { MembersChartComponent } from './members-chart/members-chart.component';
import { TermsComponent } from './terms/terms.component';
import { BubbleChartInteractiveComponent } from './difficulty-chart/custom-chart/bubble-chart-interactive.component';
import { BubbleSeriesInteractiveComponent } from './difficulty-chart/custom-chart/bubble-series-interactive.component';
import { RoundListComponent } from './round-list/round-list.component';
import { VideoListComponent } from './video-list/video-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { SchedulePipe } from './schedule.pipe';
import { GeolinkPipe } from './geolink.pipe';
import { LocalizePipe } from './localize.pipe';
import { PeriodPipe } from './period.pipe';
import { LocationPipe } from './location.pipe';
import { EventPipe } from './event.pipe';
import { ClassificationsComponent } from './libraries/classifications.component';
import { FaqRatingsComponent } from './libraries/faq-ratings.component';
import { NonStandardRulesComponent } from './libraries/non-standard-rules.component';
import { PointsComponent } from './libraries/points.component';
import { ReclassificationComponent } from './libraries/reclassification.component';
import { Ts2023Component } from './libraries/ts2023.component';
import { Ts2024Component } from './libraries/ts2024.component';
import { DivisionsComponent } from './libraries/divisions.component';
import { PlayerpackComponent } from './libraries/playerpack.component';
import { RatingsComponent } from './libraries/ratings.component';
import { OrdgCm23Component } from './libraries/ordgcm23.component';
import { OrdgCm24Component } from './libraries/ordgcm24.component';
import { TrueAmateurComponent } from './libraries/true-amateur.component';
import { IndexComponent } from './libraries/index.component';
import { TourStandardsComponent } from './libraries/tour-standards.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { AnnualReportsComponent } from './annual-reports/annual-reports.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [
        AppComponent,
        ReloadComponent,
        RoundsTabsComponent,
        RoundsTableComponent,
        AboutThisSiteComponent,
        TermsComponent,
        EventComponent,
        EventDetailComponent,
        LocalTabsComponent,
        MonthlyTabsComponent,
        UpcomingTabsComponent,
        EventsTableComponent,
        LocalTableComponent,
        MonthlyTableComponent,
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
        DifficultyChartComponent,
        MembersChartComponent,
        BubbleChartInteractiveComponent,
        BubbleSeriesInteractiveComponent,
        RoundListComponent,
        VideoListComponent,
        EventListComponent,
        SchedulePipe,
        GeolinkPipe,
        LocalizePipe,
        PeriodPipe,
        LocationPipe,
        EventPipe,
        ClassificationsComponent,
        FaqRatingsComponent,
        NonStandardRulesComponent,
        PointsComponent,
        ReclassificationComponent,
        Ts2023Component,
        Ts2024Component,
        DivisionsComponent,
        PlayerpackComponent,
        RatingsComponent,
        OrdgCm23Component,
        OrdgCm24Component,
        TrueAmateurComponent,
        IndexComponent,
        TourStandardsComponent,
        PhotoListComponent,
        AnnualReportsComponent
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
        NgxChartsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
