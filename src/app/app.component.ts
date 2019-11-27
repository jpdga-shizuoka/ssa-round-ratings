import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { CommonService } from './common.service';
import { Observable, isHandset } from './utilities';

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
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  title = 'DG Japan';
  isHandset$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private cs: CommonService,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    public router: Router,
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

    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: MyMetaData) => this.updateDescription(data));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  private updateDescription(data: MyMetaData) {
    this.titleService.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:type', content: data.type });
    this.meta.updateTag({ property: 'og:url', content: data.url });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }
    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }
  }
}
