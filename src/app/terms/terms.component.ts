import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService, TermDescription } from '../common.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  terms: TermDescription[];

  constructor(private cs: CommonService) {
  }

  ngOnInit() {
    this.terms = this.cs.getTerms();
  }
}
