import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiConfig } from '../../../models/api-config.model';
import { TmdbApiService } from '../../../services/tmdb-api.service';
import { Video } from '../../../models/video.model';
import { TvListItem } from '../../../models/tv-list-item.model';
import { MovieListItem } from '../../../models/movie-list-item.model';

@Component({
  selector: 'app-media-trending',
  templateUrl: './media-trending.component.html',
  styleUrls: ['./media-trending.component.scss']
})
export class MediaTrendingComponent implements OnInit {
  @Input() video: Video;
  @Input() media: TvListItem | MovieListItem;

  @ViewChild('playerContainer', { static: true }) playerContainer: ElementRef;

  apiConfig: ApiConfig = this.tmdbApiService.apiConfig;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit() {
  }

  getHeaderStyle() {
    let size = this.apiConfig.backdrop_sizes[this.apiConfig.backdrop_sizes.length - 1];
    let url = this.apiConfig.secure_base_url + size + this.media.backdrop_path;

    return {
      'background-image': `url(${url})`
    };
  }

  getPlayerHeight() {
    return{'height': `${parseFloat(this.playerContainer.nativeElement.offsetWidth) / 1.77}px`};
  }
}