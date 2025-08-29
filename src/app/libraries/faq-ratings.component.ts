import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-faq-ratings',
    templateUrl: './faq-ratings.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class FaqRatingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
