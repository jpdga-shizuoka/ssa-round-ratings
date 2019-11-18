import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonService } from './common.service';
import { isHandset } from './utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  title = 'DG Japan';
  isHandset$: Observable<boolean>;

  constructor(
    private cs: CommonService,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }


  get upcomingEvents() {
    return this.cs.getMenuAliase('Upcoming Events');
  }

  get results() {
    return this.cs.getMenuAliase('Results');
  }

  get localEvents() {
    return this.cs.getMenuAliase('Local Events');
  }

  get monthlyEvents() {
    return this.cs.getMenuAliase('Monthly Events');
  }

  get aboutThisSite() {
    return this.cs.getMenuAliase('About this site');
  }

  ngOnInit() {
    const language = window.navigator.language.split('-')[0];
    this.cs.primaryLanguage = language === 'ja' ? false : true;
  }

  onClickLink() {
    this.isHandset$
    .subscribe(result => result ? this.drawer.close() : '')
    .unsubscribe();
  }

  onClickLanguage() {
    this.cs.toggleLanguage();
  }
}
