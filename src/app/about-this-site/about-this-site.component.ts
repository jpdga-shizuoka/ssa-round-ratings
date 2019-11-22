import { Component } from '@angular/core';
import { CommonService } from '../common.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about-this-site',
  templateUrl: './about-this-site.component.html',
  styleUrls: ['./about-this-site.component.css']
})
export class AboutThisSiteComponent {

  get primaryLanguage() {
    return this.cs.primaryLanguage;
  }

  get baseUrl() {
    return environment.start_url;
  }

  constructor(private cs: CommonService) {
  }
}
