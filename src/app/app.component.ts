import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

import { take, filter } from 'rxjs/operators';

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
  ssMeta: Subscription;
  ssRouter: Subscription;

  constructor(
    private localize: LocalizeService,
    public ngActivatedRoute: ActivatedRoute,
    public ngTitle: Title,
    public ngMeta: Meta,
    public ngRouter: Router,
    breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
    // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    // https://medium.com/@rakshitshah/refresh-angular-component-without-navigation-148a87c2de3f
    // https://stackoverflow.com/questions/58202702/angular-8-router-does-not-fire-any-events-with-onsameurlnavigation-reload-w
    //
    // refresh this component evenwhen url updated with same address
    //
    this.ngRouter.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ssRouter = this.ngRouter.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.ngRouter.navigated = false);
  }

  ngOnInit() {
    const language = window.navigator.language.split('-')[0];
    this.localize.language = language === 'ja' ? LOCAL : GLOBAL;

    this.ssMeta = subscribeMetaDescription(this);
  }

  ngOnDestroy() {
    this.ssMeta?.unsubscribe();
    this.ssRouter?.unsubscribe();
  }

  onClickLink() {
    this.isHandset$
    .pipe(take(1))
    .subscribe(result => result ? this.drawer.close() : '');
  }

  onClickLanguage() {
    this.localize.toggleLanguage();
    this.ngRouter.navigate(['.'],  { skipLocationChange: true });
  }
}
