import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

import { take } from 'rxjs/operators';

import { LocalizeService, GLOBAL, LOCAL } from './localize.service';
import {
  isHandset,
  subscribeMetaDescription,
  MetaDescription,
  Observable,
  Subscription,
} from './ng-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, MetaDescription {
  @ViewChild('drawer') drawer: MatSidenav;
  title = 'DG Japan';
  isHandset$: Observable<boolean>;
  private ssMeta: Subscription;
  get home() {return this.localize.transform('Home');}
  get schedule() {return this.localize.transform('Schedule');}
  get results() {return this.localize.transform('Results');}
  get localEvents() {return this.localize.transform('Local Events');}
  get monthlyEvents() {return this.localize.transform('Monthly Events');}
  get stats() {return this.localize.transform('Stats');}
  get aboutThisSite() {return this.localize.transform('About this site');}

  constructor(
    private localize: LocalizeService,
    private location: Location,
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
    this.ssMeta = subscribeMetaDescription(this);
  }

  ngOnDestroy() {
    this.ssMeta?.unsubscribe();
  }

  onClickLink() {
    this.isHandset$
    .pipe(take(1))
    .subscribe(result => result ? this.drawer.close() : '');
  }

  onClickLanguage() {
    this.localize.toggleLanguage();

    // @see https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
    // @note The following technique is working, but it affects routerLinkActive;
    // https://medium.com/@rakshitshah/refresh-angular-component-without-navigation-148a87c2de3f
    const currentPath = this.location.path().replace(/^\//, '');
    this.ngRouter.navigate(['reload'])
    .then(() => this.ngRouter.navigate([currentPath]));
  }
}
