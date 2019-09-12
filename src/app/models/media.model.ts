import { TvListItem } from "./tv-list-item.model";
import { MovieListItem } from "./movie-list-item.model";

export class Media {
  title: string;
  page: number = 1;
  totalResults: number;
  totalPages: number;
  results: (TvListItem | MovieListItem)[];
  forceType: string;

  constructor(input?: any, oldResults: (TvListItem | MovieListItem)[] = [], forceType: string = "") {
    if(input) {
      this.totalPages = input.total_pages || 0;
      this.totalResults = input.total_results || 0;
      this.page = input.page || 1;
      this.title = input.title || "";
      this.forceType = forceType;
      this.results = oldResults;

      if(input.results) {
        if(input.results[0] instanceof TvListItem || input.results[0] instanceof MovieListItem) {
          this.results = this.results.concat(input.results);
        } else {
          input.results.forEach(item => {
            if(item.media_type == "tv" || this.forceType == "tv") {
              this.results.push(new TvListItem(item));
            } else if(item.media_type == "movie" || this.forceType == "movie") {
              this.results.push(new MovieListItem(item));
            }
          });
        }
      }
    }
  }
}