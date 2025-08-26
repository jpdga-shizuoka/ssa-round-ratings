import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LocalizeService } from '../localize.service';
import { TermsComponent } from '../terms/terms.component';

@Component({
    selector: 'app-about-this-site',
    templateUrl: './about-this-site.component.html',
    styleUrls: ['./about-this-site.component.css'],
    imports: [
        CommonModule,
        MatCardModule,
        TermsComponent
    ]
})
export class AboutThisSiteComponent {
  get primaryLanguage(): boolean {
    return this.localize.isGlobal;
  }

  constructor(private localize: LocalizeService) { }
}
