import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-tour-standards',
    templateUrl: './tour-standards.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class TourStandardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
