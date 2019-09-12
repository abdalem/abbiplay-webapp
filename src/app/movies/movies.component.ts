import { Component, OnInit } from '@angular/core';
import { Media } from '../models/media.model';
import { MovieListItem } from '../models/movie-list-item.model';
import { TvListItem } from '../models/tv-list-item.model';
import { Video } from '../models/video.model';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Filter } from '../models/filter.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  headerMedia: TvListItem | MovieListItem;
  headerVideo: Video;
  media: Media = new Media();
  filters: Filter = new Filter();
  screenHeight = window.innerHeight;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit() {
    this.discover();
    this.getTrendingTrailer();
  }

  getTrendingTrailer() {
    let randPage = Math.floor(Math.random() * 2) + 1;
    let randResults = Math.floor(Math.random() * 20);
    this.tmdbApiService.getTrending(new Media({page: randPage}), 'movie').subscribe(
      (media: Media) => {
        this.tmdbApiService.getVideos('movie', media.results[randResults].id).subscribe(
          (res) => {
            res.forEach((video: Video, index) => {
              if(video && video.site == 'YouTube' && video.type == 'Trailer' && media.results[randResults].backdrop_path && !this.headerVideo) {
                this.headerMedia = media.results[randResults];
                this.headerVideo = video;
              }
            })

            if(!this.headerVideo) {this.getTrendingTrailer()}
          }
        )
      }
    )
  }

  discover() {
    this.tmdbApiService.discover(this.media, "movie", this.filters).subscribe(
      (media: Media) => {
        this.media = media;
        if(this.screenHeight / this.media.results.length > 35) {
          this.media.page ++;
          this.discover();
        }
      }
    )
  }

  onScroll() {
    if(this.media.page < this.media.totalPages){
      this.media.page ++;
      this.discover();
    }
  }

  addDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let date = moment(event.value).format("YYYY-MM-DD");
    type == 'start' ? this.filters.first_date_gte = date : this.filters.first_date_lte = date;
    this.setFilters();
  }

  setFilters() {
    this.media = new Media();
    this.discover();
  }
}
