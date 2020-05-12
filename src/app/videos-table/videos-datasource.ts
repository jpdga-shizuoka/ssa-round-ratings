import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { RemoteService, VideoInfo, EventCategory } from '../remote.service';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class VideosDataSource extends MatTableDataSource<VideoInfo> {

  constructor(
    private readonly remote: RemoteService,
    private readonly category: EventCategory,
    private readonly limit?: number,
    private readonly keyword?: string,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect() {
    this.remote.getVideos(this.category)
    .pipe(
      map(videos => this.filterWithKeyword(videos)),
      map(videos => this.limit ? videos.slice(0, this.limit) : videos)
    ).subscribe(videos => this.data = videos);

    return super.connect();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    super.disconnect();
  }

  private filterWithKeyword(videos: VideoInfo[]) {
    if (!this.keyword) {
      return videos;
    }
    const results: VideoInfo[] = [];
    videos.forEach(video => {
      if (video.title.toLowerCase().includes(this.keyword)) {
        results.push(video);
      }
    });
    return results;
  }
}
