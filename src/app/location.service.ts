import { Injectable } from '@angular/core';
import { LocalizeService } from './localize.service';
import { LocationInfo } from './models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private localize: LocalizeService) { }

  transform(location?: LocationInfo, format?: string): string {
    if (!location || !format) {
      return '';
    }
    if (format === 'title-region') {
      const title = this.localize.transform(location.title);
      const region = this.localize.transform(location.prefecture);
      return `${title}, ${region}`;
    }
    return '';
  }
}
