import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommonService, EventInfo, RoundInfo } from '../common.service';
import { VideoInfo, TotalYearPlayers } from '../models';
import { isHandset } from '../utilities';

const DISPLAYED_COLUMNS_UPCOMING = [['date', 'title'], ['date', 'title', 'location']];
const DISPLAYED_COLUMNS_PAST = [['event', 'hla', 'ssa'], ['year', 'event', 'round', 'hla', 'ssa']];

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  tableSourceUpcoming: MatTableDataSource<EventInfo>;
  tableSourcePast: MatTableDataSource<RoundInfo>;
  videosSource: MatTableDataSource<VideoInfo>;
  playersSource: TotalYearPlayers[];
  isHandset$: Observable<boolean>;

  constructor(
    private cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    this.tableSourceUpcoming
      = new MatTableDataSource<EventInfo>(this.cs.getEvents('upcoming').slice(0, 3));
    this.tableSourcePast
      = new MatTableDataSource<RoundInfo>(this.cs.getRounds().slice(0, 3));

    const lists = this.cs.getPastLists();
    this.videosSource = new MatTableDataSource<VideoInfo>(lists.videos);
    this.playersSource = lists.players;
  }

  get upcomingEvents() {
    return this.cs.getMenuAliase('Upcoming Events');
  }

  get results() {
    return this.cs.getMenuAliase('Results');
  }

  get videos() {
    return this.cs.getMenuAliase('Video Library');
  }

  get players() {
    return this.cs.getMenuAliase('Anual Total Players');
  }

  get displayedColumnsUpcoming$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS_UPCOMING[hs ? 0 : 1])
    );
  }

  get displayedColumnsPast$(): Observable<string[]> {
    return this.isHandset$.pipe(
      map(hs => DISPLAYED_COLUMNS_PAST[hs ? 0 : 1])
    );
  }
}
