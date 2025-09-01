import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-classifications',
    templateUrl: './classifications.component.html',
    styleUrls: ['./libraries.component.css'],
    imports: [
      CommonModule,
      RouterModule,
    ]
})
export class ClassificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
