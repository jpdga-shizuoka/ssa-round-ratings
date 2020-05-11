import { Pipe, PipeTransform } from '@angular/core';
import { LocationInfo } from './models';
import { LocalizeService } from './localize.service';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  constructor(private readonly localize: LocalizeService) {}

  transform(location: LocationInfo): string {
    if (!location) {
      return '';
    }
    const title = this.localize.transform(location.title);
    const region = this.localize.transform(location.prefecture);
    return `${title}, ${region}`;
  }
}
