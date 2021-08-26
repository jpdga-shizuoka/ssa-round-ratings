import { Component } from '@angular/core';
import { LocalizeService } from '../localize.service';

@Component({
  selector: 'app-about-this-site',
  templateUrl: './about-this-site.component.html',
  styleUrls: ['./about-this-site.component.css']
})
export class AboutThisSiteComponent {
  get primaryLanguage(): boolean {
    return this.localize.isGlobal;
  }

  constructor(private localize: LocalizeService) { }
}
