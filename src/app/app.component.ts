import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ratings';

  constructor(private commonService: CommonService) {
  }

  onClickLanguage() {
    this.commonService.toggleLanguage();
  }
}
