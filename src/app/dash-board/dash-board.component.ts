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
const LOCAL_EVENT_ID = 1;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  tableSourceUpcoming: MatTableDataSource<EventInfo>;
  tableSourceLocal: MatTableDataSource<EventInfo>;
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
    this.videosSource
      = new MatTableDataSource<VideoInfo>();
    this.tableSourceLocal
      = new MatTableDataSource<EventInfo>();
    this.tableSourceUpcoming
      = new MatTableDataSource<EventInfo>(this.cs.getEvents('upcoming').slice(0, 3));
    this.tableSourcePast
      = new MatTableDataSource<RoundInfo>();

    setTimeout(() => {
      this.tableSourcePast.data = this.cs.getRounds().slice(0, 5);
      const lists = this.cs.getPastLists();
      this.videosSource.data = lists.videos.slice(0, 5);
      this.playersSource = lists.players;
    });
  }

  get upcomingEvents() {
    return this.cs.getMenuAliase('Official');
  }

  get localEvents() {
    return this.cs.getMenuAliase('Local');
  }

  get schedule() {
    return this.cs.getMenuAliase('Schedule');
  }

  get results() {
    return this.cs.getMenuAliase('Results');
  }

  get stats() {
    return this.cs.getMenuAliase('Stats');
  }

  get videos() {
    return this.cs.getMenuAliase('Videos');
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

  onEventsTabChange(event) {
    if (event.index === LOCAL_EVENT_ID && !this.tableSourceLocal.data.length) {
      this.tableSourceLocal.data = this.cs.getEvents('local').slice(0, 3);
    }
  }
}
