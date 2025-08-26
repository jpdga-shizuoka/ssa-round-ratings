import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscInfo } from '../app-common';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PhotoListComponent {
  @Input() list!: MiscInfo[];

}
