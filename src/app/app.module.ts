//Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

//External Modules
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ClickOutsideModule } from 'ng-click-outside';

//Angular Material Modules
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';

//Config
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Services
import { TmdbApiService } from './services/tmdb-api.service';

//Common Modules
import { MediaListComponent } from './common/media/media-list/media-list.component';
import { MobileFooterComponent } from './common/mobile-footer/mobile-footer.component';
import { MediaTrendingComponent } from './common/media/media-trending/media-trending.component';
import { HeaderComponent } from './common/header/header.component';
import { FilterMenuComponent } from './common/filter-menu/filter-menu.component';

//View Modules
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MediaListComponent,
    HomeComponent,
    MobileFooterComponent,
    HeaderComponent,
    MediaTrendingComponent,
    MoviesComponent,
    ShowsComponent,
    FilterMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxYoutubePlayerModule,
    ClickOutsideModule,
  ],
  providers: [
    TmdbApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
