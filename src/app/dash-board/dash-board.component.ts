import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isHandset } from '../ng-utilities';

const DISPLAYED_COLUMNS_UPCOMING = [['date', 'title'], ['date', 'title', 'location']];
const EVENT_COLUMNS = [['date', 'title'], ['date', 'title', 'location']];
const ROUND_COLUMNS_PAST = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
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
