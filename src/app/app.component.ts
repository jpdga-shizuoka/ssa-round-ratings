import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

import { filter, map, mergeMap } from 'rxjs/operators';

import { LocalizeService, GLOBAL, LOCAL } from './localize.service';
import {
  isHandset,
  subscribeMetaDescription,
  MetaDescription,
  Observable,
  Subscription,
} from './ng-utilities';

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
    private localize: LocalizeService,
    public ngActivatedRoute: ActivatedRoute,
    public ngTitle: Title,
    public ngMeta: Meta,
    public ngRouter: Router,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit() {
    const language = window.navigator.language.split('-')[0];
    this.localize.language = language === 'ja' ? LOCAL : GLOBAL;

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
    this.localize.toggleLanguage();
  }
}
