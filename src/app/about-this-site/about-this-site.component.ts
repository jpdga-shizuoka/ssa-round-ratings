import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-about-this-site',
  templateUrl: './about-this-site.component.html',
  styleUrls: ['./about-this-site.component.css']
})
export class AboutThisSiteComponent {

  get primaryLanguage() {
    return this.cs.primaryLanguage;
  }

  get title() {
    return this.cs.getMenuAliase('About this site');
  }

  constructor(
    private cs: CommonService,
    private location: Location,
  ) {
  }

  back() {
    this.location.back();
  }
}
