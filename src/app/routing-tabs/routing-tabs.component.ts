import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { Subscription } from 'rxjs';

import { LocationSearch, EventGo } from '../models';

@Component({
  template: ''
})
export class RoutingTabsComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  tabs!: string[];
  private subscription?: Subscription;

  constructor(
    private router: Router,
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
    this.location.go(path.join('/'));
  }

  onEventGo(event: EventGo): void {
    this.router.navigate(['/event', event.id]);
  }

  onLocationSearch(event: LocationSearch): void {
    let commands: string[] = [];
    switch (event.category) {
      case 'upcoming':
        commands = ['/events', 'upcoming'];
        break;
      case 'past':
        commands = ['/past', 'events'];
        break;
      case 'local':
        commands = ['/local', 'events'];
        break;
      case 'monthly':
        commands = ['/monthly', 'events'];
        break;
    }
    this.router.navigate(commands, {
      queryParams: {
        location: event.key
      }
    });
    this.selectedTab = 0;
  }
}
