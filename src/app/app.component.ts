import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

import { filter, map, mergeMap } from 'rxjs/operators';

import { CommonService } from './common.service';
import {
  isHandset,
  subscribeMetaDescription,
  MetaDescription,
  Observable,
  Subscription,
} from './utilities';

interface MyMetaData {
  title: string;
  type: string;
  url: string;
  image?: string;
  description?: string;
  keywords?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, MetaDescription {
  @ViewChild('drawer') drawer: MatSidenav;
  title = 'DG Japan';
  isHandset$: Observable<boolean>;
  metaSubscription: Subscription;

  constructor(
    private cs: CommonService,
    public ngActivatedRoute: ActivatedRoute,
    public ngTitle: Title,
    public ngMeta: Meta,
    public ngRouter: Router,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  get home() {
    return this.cs.getMenuAliase('Home');
  }

  get upcomingEvents() {
    return this.cs.getMenuAliase('Schedule');
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

  get stats() {
    return this.cs.getMenuAliase('Stats');
  }

  get aboutThisSite() {
    return this.cs.getMenuAliase('About this site');
  }

  ngOnInit() {
    const language = window.navigator.language.split('-')[0];
    this.cs.primaryLanguage = language === 'ja' ? false : true;

    this.metaSubscription = subscribeMetaDescription(this);
  }

  ngOnDestroy() {
    if (this.metaSubscription) {
      this.metaSubscription.unsubscribe();
    }
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
