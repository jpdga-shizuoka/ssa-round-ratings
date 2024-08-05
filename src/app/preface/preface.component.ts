import { Component } from '@angular/core';

import { LocalizeService } from '../localize.service';

@Component({
  selector: 'app-preface',
  templateUrl: './preface.component.html',
  styleUrls: ['./preface.component.css']
})
export class PrefaceComponent {

  constructor(private localize: LocalizeService) {}

  get isGlobal(): boolean {
    return this.localize.isGlobal
  }
}
