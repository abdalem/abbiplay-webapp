import { Subscription } from "rxjs";
import { TvListItem } from "./tv-list-item.model";
import { MovieListItem } from "./movie-list-item.model";

export class MediaSection {
  title: string;
  total_pages: number = 0;
  subscription: Subscription;
  results: (TvListItem | MovieListItem)[] = [];
  forceType: string;

  constructor(input?: any) {
    if(input) {
      Object.assign(this, input);
      this.results = [];
      if(input.results && input.results.length > 0 && !(input.results[0] instanceof TvListItem || input.results[0] instanceof MovieListItem)){
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