import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { LocalizeService } from '../localize.service';
import { LocalizePipe } from '../localize.pipe';

@Component({
    selector: 'app-preface',
    templateUrl: './preface.component.html',
    styleUrls: ['./preface.component.css'],
    imports: [
    MatExpansionModule,
    LocalizePipe
]
})
export class PrefaceComponent {

  constructor(private localize: LocalizeService) {}

  get isGlobal(): boolean {
    return this.localize.isGlobal
  }
}
