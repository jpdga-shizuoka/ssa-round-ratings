import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { LocalizeService } from '../localize.service';

@Component({
  selector: 'app-about-this-site',
  templateUrl: './about-this-site.component.html',
  styleUrls: ['./about-this-site.component.css']
})
export class AboutThisSiteComponent {

  get primaryLanguage() {
    return this.localize.isGlobal;
  }

  constructor(
    private localize: LocalizeService,
    private location: Location,
  ) {
  }

  back() {
    this.location.back();
  }
}
