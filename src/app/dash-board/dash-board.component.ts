import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isHandset } from '../ng-utilities';
import { LocalizePipe } from '../localize.pipe';
import { PrefaceComponent } from '../preface/preface.component';
import { EventsTableComponent } from '../events-table/events-table.component';
import { LocalTableComponent } from '../events-table/local-table.component';
import { RoundsTableComponent } from '../rounds-table/rounds-table.component';
import { VideosTableComponent } from '../videos-table/videos-table.component';

const DISPLAYED_COLUMNS_UPCOMING = [['date', 'title'], ['date', 'title', 'location']];
const EVENT_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const ROUND_COLUMNS_PAST = [['event', 'hla', 'ssa', 'td'], ['year', 'event', 'round', 'hla', 'ssa', 'td']];

@Component({
    selector: 'app-dash-board',
    templateUrl: './dash-board.component.html',
    styleUrls: ['./dash-board.component.css'],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTabsModule,
        LocalizePipe,
        PrefaceComponent,
        EventsTableComponent,
        LocalTableComponent,
        RoundsTableComponent,
        VideosTableComponent
    ]
})
export class DashBoardComponent {
  isHandset$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get displayedColumnsUpcoming$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS_UPCOMING[hs ? 0 : 1])
    );
  }

  get eventsColumnsPast$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => EVENT_COLUMNS[hs ? 0 : 1])
    );
  }

  get roundsColumnsPast$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => ROUND_COLUMNS_PAST[hs ? 0 : 1])
    );
  }
}
