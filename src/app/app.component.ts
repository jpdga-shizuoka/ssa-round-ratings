import { Component, ViewChild } from '@angular/core';
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
export class AppComponent {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

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
    this.commonService.toggleLanguage();
  }
}
