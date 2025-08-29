import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-divisions',
    templateUrl: './divisions.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class DivisionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
