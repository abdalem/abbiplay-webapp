import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription, Observable } from 'rxjs';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Media } from '../models/media.model';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  querySubscription: Subscription;
  query: string;
  media: Media = new Media();
  mediaSubscription: Subscription;
  screenHeight = window.innerHeight;

  constructor(private tmdbApiService: TmdbApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(
      (query) => {
        if(query.length != 0) {
          this.media = new Media();
          this.query = query.q;
          this.search();
        }
      }
    );
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  
  search() {
    this.tmdbApiService.search(this.query, this.media).subscribe(
      (res) => {
        this.media = res;
        if(this.screenHeight / this.media.results.length > 35) {
          this.media.page ++;
          this.search();
        }
      }
    );

  }

  onScroll() {
    if(this.media.page < this.media.totalPages){
      this.media.page ++;
      this.search();
    }
  }
}
