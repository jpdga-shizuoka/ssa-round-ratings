import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { RemoteService, AnnualReport } from '../remote.service';

export { AnnualReport};

/**
 * Data source for the AnnualReports view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AnnualReportsDataSource extends MatTableDataSource<AnnualReport> {
  loading = true;

  constructor(
    private remote: RemoteService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): BehaviorSubject<AnnualReport[]> {
    this.remote.getAnnualReports().subscribe(
      reports => { this.data = reports; },
      err => console.log(err),
      () => { this.loading = false; }
    );
    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
}
