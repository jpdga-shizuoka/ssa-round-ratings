import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ts2023',
    templateUrl: './ts2023.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class Ts2023Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
