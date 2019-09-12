import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media.model';
import { Observable, Subject, forkJoin } from 'rxjs';
import { MovieListItem } from '../models/movie-list-item.model';
import { TvListItem } from '../models/tv-list-item.model';
import {map} from 'rxjs/operators'
import { Filter } from '../models/filter.model';
import { ApiConfig } from '../models/api-config.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})

export class TmdbApiService {
  private apiKey: string = '?api_key=46171ddf5fcb0b97fb17f730307bdd0c';
  private language: string = '&language=fr-FR';
  private region: string = '&region=FR';
  private rootUrl: string = 'https://api.themoviedb.org/3';
  public apiConfig: ApiConfig;

  constructor(private httpClient: HttpClient) {}  

  private buildResponse(medias: Media[], title: string) {
    return {
      title: title,
      page: medias[0].page,
      total_pages: Math.max(medias[0].totalPages, medias[1].totalPages),
      total_results: Math.max(medias[0].totalResults, medias[1].totalResults),
      results: this.sortArray(medias[0].results.concat(medias[1].results), 'popularity')
    };
  }

  private sortArray(items, key) {
    return items.sort((first, next) => {
      let firstPop = first[key], nextPop = next[key];
      return firstPop > nextPop ? -1 : (firstPop < nextPop ? 1 : 0);
    })
  }

  ////////////// CONFIG
  setConfig() {
    let request_url = 'https://api.themoviedb.org/3/configuration' + this.apiKey;
    return this.httpClient.get(request_url).pipe(
      map(res => {
        this.apiConfig = new ApiConfig(res["images"]);
        return true;
      })
    );
  }

  ////////////// SEARCH
  search(query: string, media: Media) {
    let request_url = 'https://api.themoviedb.org/3/search/multi' + this.apiKey + this.language + this.region + `&page=${media.page}&query=${query}`;

    return this.httpClient.get<Media>(request_url).pipe(
      map(res => {
        return new Media(res, media.results);
      })
    );
  }

  ////////////// ALL TYPE MEDIAS
  getByAllType(media: Media, path: string) {
    return forkJoin(
      this.getByMediaType(new Media({page: media.page}), 'tv', path), 
      this.getByMediaType(new Media({page: media.page}), 'movie', path))
    .pipe( map((res) => {
      let input = this.buildResponse(res, media.title);
      return new Media(input, media.results);
    }));
  }

  getByMediaType(media: Media, type: string, path: string) {
    path = path.split(/(?=[A-Z])/).join('_').toLowerCase();
    let request_url = `${this.rootUrl}/${type}/${path}${this.apiKey}${this.language}${this.region}&page=${media.page}`;

    return this.httpClient.get<Media>(request_url).pipe(
      map(res => {
        res['title'] = media.title;
        return new Media(res, media.results, type);
      })
    );
  }

  getAllTrending(media: Media) {
    return forkJoin(
      this.getTrending(new Media({page: media.page}), 'tv'), 
      this.getTrending(new Media({page: media.page}), 'movie'))
    .pipe( map((res) => {
      let input = this.buildResponse(res, media.title);
      return new Media(input, media.results);
    }));
  }

  getTrending(media: Media, type: string) {
    let request_url = `${this.rootUrl}/trending/${type}/day${this.apiKey}${this.language}${this.region}&page=${media.page}`;

    return this.httpClient.get<Media>(request_url).pipe(
      map(res => {
        res['title'] = media.title;
        return new Media(res, media.results, type);
      })
    );
  }
  
  getDetails(type: string, id: number) {
    let request_url = `${this.rootUrl}/${type}/${id}${this.apiKey}${this.language}${this.region}`;

    return this.httpClient.get<Media>(request_url).pipe(
      map(res => {
      })
    );
  }

  getVideos(type: string, id: number) {
    let request_url = `${this.rootUrl}/${type}/${id}/videos${this.apiKey}${this.language}${this.region}`;

    return this.httpClient.get<Video[]>(request_url).pipe(
      map(res => {
        return res['results'].map(video => new Video(video));
      })
    );
  }

  ////////////// DISCOVER
  discover(media: Media, type: string, filters: Filter) {
    let filters_params = type == "movie" ? filters.buildForMovie() : filters.buildForTv();
    let request_url = 'https://api.themoviedb.org/3/discover/' + type + this.apiKey + this.language + this.region + `&page=${media.page}` + filters_params;

    return this.httpClient.get<Media>(request_url).pipe(
      map(res => {
        return new Media(res, media.results, type);
      })
    );
  }

  ////////////// MOVIES
  public movies = {
    details: (id: number) => {
      let request_url = 'https://api.themoviedb.org/3/movie/' + id;
      return this.httpClient.get(request_url);
    },
    credits: () => {},
    recommendations: () => {},
    accountStates: () => {},
    similars: () => {},
    nowPlaying: () => {},
    popular: () => {},
    topRated: () => {},
    upcoming: () => {},
    discover: () => {}
  };

  ////////////// TV SHOWS
  public shows = {
    details: (id: number) => {
      let request_url = 'https://api.themoviedb.org/3/tv/' + id;
      return this.httpClient.get(request_url);
    },
    credits: () => {},
    recommendations: () => {},
    accountStates: () => {},
    similars: () => {},
    popular: () => {},
    topRated: () => {},
    discover: () => {},
    seasons: {
      details: () => {},
      accountStates: () => {},
      episodes: {
        details: () => {},
        accountStates: () => {}
      }
    },
  };
}
