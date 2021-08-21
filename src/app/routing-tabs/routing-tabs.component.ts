import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export class RoutingTabsComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  tabs!: string[];
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    if (!this.tabs) {
      throw new Error('[tabs] must be initialized');
    }
    this.subscription = this.route.params.subscribe(params => {
      const tag = params.tagname as string;
      const index = this.tabs.findIndex((value => value === tag));
      if (index >= 0 && index < this.tabs.length) {
        this.selectedTab = index;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    const path = this.location.path().split('/');
    path[path.length - 1] = this.tabs[event.index];
    this.location.replaceState(path.join('/'));
  }
}
