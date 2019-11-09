import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cs: CommonService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    const language = window.navigator.language.split('-')[0];
    this.cs.primaryLanguage = language === 'ja' ? false : true;
  }

  onClickLink() {
    this.breakpointObserver.observe(Breakpoints.Handset)
    .subscribe(result => {
      if (result.matches) {
        this.drawer.close();
      }
    })
    .unsubscribe();
  }

  onClickLanguage() {
    this.cs.toggleLanguage();
  }
}
