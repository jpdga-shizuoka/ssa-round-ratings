import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-non-standard-rules',
    templateUrl: './non-standard-rules.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class NonStandardRulesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
