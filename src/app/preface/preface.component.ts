import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { LocalizeService } from '../localize.service';
import { LocalizePipe } from '../localize.pipe';

@Component({
  selector: 'app-preface',
  templateUrl: './preface.component.html',
  styleUrls: ['./preface.component.css'],
  standalone: true,
  imports: [
    CommonModule,
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
