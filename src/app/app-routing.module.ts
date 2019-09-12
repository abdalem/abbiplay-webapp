import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ShowsComponent } from './shows/shows.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'recherche', component: SearchComponent},
  {path: 'series', component: ShowsComponent},
  {path: 'films', component: MoviesComponent},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', redirectTo: 'accueil'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
