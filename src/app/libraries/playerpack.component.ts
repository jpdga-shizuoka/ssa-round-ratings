import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-playerpack',
    templateUrl: './playerpack.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class PlayerpackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
