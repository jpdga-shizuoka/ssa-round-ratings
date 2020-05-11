import { Pipe, PipeTransform } from '@angular/core';
import { LocalizeService } from './localize.service';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {

  constructor(private readonly localize: LocalizeService) { }

  transform(value?: string): string {
    return this.localize.transform(value);
  }
}
