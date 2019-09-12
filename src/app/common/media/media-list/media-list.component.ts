import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApiConfig } from '../../../models/api-config.model';
import { TmdbApiService } from '../../../services/tmdb-api.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit, OnDestroy {
  @Input() items: any;

  apiConfig: ApiConfig = this.tmdbApiService.apiConfig;
  mediaSubscription: Subscription;
  mediaBreakpoint: string;

  constructor(private tmdbApiService: TmdbApiService, private mediaObserver: MediaObserver ) { }

  ngOnInit() {
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.mediaBreakpoint = change.mqAlias;
      }
    )
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  getCardStyles(posterPath: string, backdropPath: string) {
    let path = this.mediaBreakpoint == 'xs' ? posterPath : backdropPath;
    let size = this.mediaBreakpoint == 'xs' ? this.apiConfig.poster_sizes[0] : this.apiConfig.backdrop_sizes[0];
    let url = path ? this.apiConfig.secure_base_url + size + path : 'https://www.kendormusic.com/cc6/images/cache/skins/kurouto/images/common/noimage_normal.270.png';

    return {
      'background-image': `url(${url})`,
      'margin': this.mediaBreakpoint == 'xs' || this.mediaBreakpoint == 'sm' ? `${4.0/6.0}%` : this.mediaBreakpoint == 'md' ? `${4.0/8.0}%` : this.mediaBreakpoint == 'lg' ? `${4.0/10.0}%` : `${4.0/12.0}%`,
      'height': this.mediaBreakpoint == 'xs' ? "44vw" : this.mediaBreakpoint == 'sm' ? "17vw" : this.mediaBreakpoint == 'md' ? "10.5vw" :  this.mediaBreakpoint == 'lg' ? "9vw" : "8vw",

    };
  }
}
