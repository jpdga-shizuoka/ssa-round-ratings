import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ratings',
    templateUrl: './ratings.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class RatingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
