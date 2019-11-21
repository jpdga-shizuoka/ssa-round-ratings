import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export { BreakpointObserver, Observable, of };
export { map, shareReplay };

export function isHandset(observer: BreakpointObserver): Observable<boolean> {
  return observer
  .observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(1)
  );
}
