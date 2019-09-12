import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TmdbApiService } from './services/tmdb-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  configDone: boolean;

  constructor(private tmdbApiService: TmdbApiService) {}
  
  ngOnInit() {
    this.tmdbApiService.setConfig().subscribe(
      (response) => {
        this.configDone = response;
      }
    );
  }
}
