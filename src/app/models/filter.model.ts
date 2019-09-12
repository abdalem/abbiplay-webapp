export class Filter{
  sort_by: string;
  first_date_gte: string;
  first_date_lte: string;
  vote_average_gte: number;
  vote_average_lte: number;
  with_genres: number[] = [];
  with_genres_separator: string = ",";
  with_people: number[] = [];
  with_people_separator: string = ",";

  constructor(input?: Object) {
    if(input){Object.assign(this, input)};
  }

  buildForMovie() {
    let filterQuery: string = "";
    if(this.sort_by) {filterQuery += `&sort_by=${this.sort_by}`};
    if(this.first_date_gte) {filterQuery += `&primary_release_date.gte=${this.first_date_gte}`};
    if(this.first_date_lte) {filterQuery += `&primary_release_date.lte=${this.first_date_lte}`};
    if(this.vote_average_gte) {filterQuery += `&vote_average.gte=${this.vote_average_gte}`};
    if(this.vote_average_lte) {filterQuery += `&vote_average.lte=${this.vote_average_lte}`};
    if(this.with_genres.length > 0) {filterQuery += `&with_genres=${this.with_genres.join(this.with_genres_separator)}`};
    if(this.with_people.length > 0) {filterQuery += `&with_people=${this.with_people.join(this.with_people_separator)}`};
    return filterQuery;
  }

  buildForTv() {
    let filterQuery: string = "";
    if(this.sort_by) {filterQuery += `&sort_by=${this.sort_by}`};
    if(this.first_date_gte) {filterQuery += `&first_air_date.gte=${this.first_date_gte}`};
    if(this.first_date_lte) {filterQuery += `&first_air_date.lte=${this.first_date_lte}`};
    if(this.vote_average_gte) {filterQuery += `&vote_average.gte=${this.vote_average_gte}`};
    if(this.vote_average_lte) {filterQuery += `&vote_average.lte=${this.vote_average_lte}`};
    if(this.with_genres.length > 0) {filterQuery += `&with_genres=${this.with_genres.join(this.with_genres_separator)}`};
    return filterQuery;
  }
}