import { Component, Input } from '@angular/core';

import { CourseRatingsItem } from '../course-rating';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent {

  @Input() detail: CourseRatingsItem;

}
