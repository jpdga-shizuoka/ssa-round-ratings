/**
 * This is just a component to refresh another component
 * @see AppComponent.onClickLanguage as well
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reload',
  template: ''
})
export class ReloadComponent implements OnInit, AfterViewInit {
  private currentpath?: string;

  constructor(
    private route: ActivatedRoute,
    private ngRouter: Router
  ) { }

  ngOnInit() {
    this.currentpath = this.route.snapshot.paramMap.get('currentpath') || '';
  }

  ngAfterViewInit(): void {
    this.ngRouter.navigate([this.currentpath], { skipLocationChange: true });
  }
}
