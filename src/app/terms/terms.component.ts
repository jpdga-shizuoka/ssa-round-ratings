import { Component } from '@angular/core';
import { LocalizeService } from '../localize.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  get primaryLanguage(): boolean {
    return this.localize.isGlobal;
  }

  constructor(private localize: LocalizeService) { }
}
