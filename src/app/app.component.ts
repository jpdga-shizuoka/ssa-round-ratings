import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { LocalizeService } from './localize.service';
import {
  isHandset,
  subscribeMetaDescription,
  MetaDescription,
  Observable,
  Subscription
} from './ng-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, MetaDescription {
  @ViewChild('drawer') drawer!: MatSidenav;
  title = 'DG Japan';
  isHandset$: Observable<boolean>;
  subtitle$ = new BehaviorSubject<string>('');
  private ssMeta?: Subscription;
  get subtitle(): string { return this.localize.transform(this.subtitle$.value); }
  get home(): string { return this.localize.transform('Home'); }
  get schedule(): string { return this.localize.transform('Upcoming'); }
  get results(): string { return this.localize.transform('Results'); }
  get localEvents(): string { return this.localize.transform('Local Events'); }
  get monthlyEvents(): string { return this.localize.transform('Monthly Events'); }
  get stats(): string { return this.localize.transform('Stats'); }
  get aboutThisSite(): string { return this.localize.transform('About this site'); }

  constructor(
    private localize: LocalizeService,
    private location: Location,
    public ngActivatedRoute: ActivatedRoute,
    public ngTitle: Title,
    public ngMeta: Meta,
    public ngRouter: Router,
    breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = isHandset(breakpointObserver);
  }

  ngOnInit(): void {
    this.ssMeta = subscribeMetaDescription(this);
  }

  ngOnDestroy(): void {
    this.ssMeta?.unsubscribe();
  }

  onClickLink(): void {
    this.isHandset$
      .pipe(take(1))
      .subscribe(result => result ? this.drawer.close() : '');
  }

  async onClickLanguage(): Promise<void> {
    this.localize.toggleLanguage();

    // @see https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
    // @note The following technique is working, but it affects routerLinkActive;
    // https://medium.com/@rakshitshah/refresh-angular-component-without-navigation-148a87c2de3f
    const currentPath = this.location.path().split('?')[0].replace(/^\//, '');
    await this.ngRouter.navigate(['/reload', currentPath], { skipLocationChange: true });
  }
}
