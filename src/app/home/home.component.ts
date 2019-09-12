import { Component, OnInit, OnDestroy} from '@angular/core';
import { Media } from '../models/media.model';
import { MovieListItem } from '../models/movie-list-item.model';
import { TvListItem } from '../models/tv-list-item.model';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sections = {
    popular: new Media({title: 'Les plus populaires'}),
    trending: new Media({title: 'Les tendances actuelles'}),
    topRated: new Media({title: 'Les mieux notés'}),
    onTheAir: new Media({title: 'En cours de diffusion'}),
    nowPlaying: new Media({title: 'Actuellement au cinéma'}),
    upcoming: new Media({title: 'Prochainement au cinéma'}),
  };
  byPath = ['popular', 'topRated'];
  byMovie = ['nowPlaying', 'upcoming'];
  sectionsOrder = ['popular', 'trending', 'topRated', 'onTheAir', 'nowPlaying', 'upcoming'];
  headerMedia: TvListItem | MovieListItem;
  headerVideo: Video;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit() {
    this.sectionsOrder.forEach(key => {
      this.getItems(key);
    })

    this.getTrendingTrailer();
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  onScroll(key: string) {
    if(this.sections[key].page < this.sections[key].totalPages){
      this.sections[key].page ++;
      this.getItems(key);
    }
  }

  getItems(key: string) {
    if(this.byPath.includes(key)){
      this.tmdbApiService.getByAllType(this.sections[key], key).subscribe(
        (media: Media) => {
          this.sections[key] = media;
        }
      )
    }else if(key == 'onTheAir'){
      this.tmdbApiService.getByMediaType(this.sections[key], 'tv', key).subscribe(
        (media: Media) => {
          this.sections[key] = media;
        }
      )
    }else if(this.byMovie.includes(key)){
      this.tmdbApiService.getByMediaType(this.sections[key], 'movie', key).subscribe(
        (media: Media) => {
          this.sections[key] = media;
        }
      )
    }else if(key == 'trending'){
      this.tmdbApiService.getAllTrending(this.sections[key]).subscribe(
        (media: Media) => {
          this.sections[key] = media;
        }
      )
    }
  }

  scrollTo(side: string, id: string) {
    let element = document.getElementById(id);
    let width = element.offsetWidth;
    side == "left" ? element.scrollLeft -= width : element.scrollLeft += width;
  }

  getTrendingTrailer() {
    let randPage = Math.floor(Math.random() * 2) + 1;
    let randResults = Math.floor(Math.random() * 40);
    this.tmdbApiService.getAllTrending(new Media({page: randPage})).subscribe(
      (media: Media) => {
        let type = media.results[randResults] instanceof TvListItem ? 'tv' : 'movie';
        
        this.tmdbApiService.getVideos(type, media.results[randResults].id).subscribe(
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


}
