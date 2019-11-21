import { Component } from '@angular/core';
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

  constructor(private cs: CommonService) {
  }
}
