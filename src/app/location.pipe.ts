import { Pipe, PipeTransform } from '@angular/core';
import { LocationInfo } from './models';
import { LocalizeService } from './localize.service';

@Pipe({
  name: 'locationPrint',
  standalone: true
})
export class LocationPipe implements PipeTransform {
  constructor(private readonly localize: LocalizeService) {}

  transform(location: LocationInfo | null, format?: string): string {
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
