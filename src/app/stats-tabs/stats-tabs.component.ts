import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent implements OnInit, OnDestroy {
  private ssRoute?: Subscription;
  selectedTab = 0;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.ssRoute = this.route.url.subscribe(urls => {
      switch (urls[1].path) {
        case 'players':
          this.selectedTab = 1;
          break;
        case 'difficulty':
        default:
          this.selectedTab = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.ssRoute?.unsubscribe();
  }
}
