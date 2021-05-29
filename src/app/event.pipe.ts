import { Pipe, PipeTransform } from '@angular/core';
import { EventInfo } from './models';

@Pipe({
  name: 'eventPrint'
})
export class EventPipe implements PipeTransform {
  transform(event: EventInfo, param: string): string | undefined {
    if (param === 'title') {
      return event?.title;
    }
    return undefined;
  }
}
