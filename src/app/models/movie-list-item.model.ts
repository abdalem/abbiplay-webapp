export class MovieListItem{
  poster_path: string | null;
  overview: string;
  media_type: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;

  constructor(input?: Object) {
    if(input){Object.assign(this, input)};
  }
}