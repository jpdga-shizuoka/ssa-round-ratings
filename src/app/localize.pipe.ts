import { Pipe, PipeTransform } from '@angular/core';
import { LocalizeService, LocalizationCategory } from './localize.service';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {

  constructor(private readonly localize: LocalizeService) { }

  transform(value?: string, lc?: LocalizationCategory): string|undefined {
    if (!value) {return undefined;}
    return this.localize.transform(value, lc);
  }
}
