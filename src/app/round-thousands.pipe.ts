import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundThousands',
})
export class RoundThousandsPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    if (value == null) return 0;
    return Math.round(value / 1000) * 1000;
  }
}
