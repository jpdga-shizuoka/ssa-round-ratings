import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-true-amateur',
    templateUrl: './true-amateur.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class TrueAmateurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
