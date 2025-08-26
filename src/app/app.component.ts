import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BehaviorSubject } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

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
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
  ]
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
  get libraries(): string { return this.localize.transform('Libraries'); }
  get aboutThisSite(): string { return this.localize.transform('About this site'); }

  constructor(
    private localize: LocalizeService,
    private location: Location,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    public ngActivatedRoute: ActivatedRoute,
    public ngTitle: Title,
    public ngMeta: Meta,
    public ngRouter: Router,
    breakpointObserver: BreakpointObserver
  ) {
    if (swUpdate.isEnabled && environment.production) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe((evt) => {
          this.promptUser(evt).then((result) => {
            if (result) {
              document.location.reload();
            }
          });
        }
      )
    }
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

  private promptUser(evt: VersionReadyEvent): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef = this.snackBar.open(
        this.localize.transform('A new version is available'),
        this.localize.transform('Update'), {
        duration: 30000,
      });

      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });

      snackBarRef.afterDismissed().subscribe(() => {
        resolve(false);
      });
    });
  }
}
