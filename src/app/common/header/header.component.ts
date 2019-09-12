import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild("search", { static: true }) searchField: ElementRef;
  searchQuery: string;
  searchIsOpen: boolean = false;
  inputWidth: string = "0";
  routerSubscription = new Subscription;

  constructor(private router: Router) {
    this.router.events.pipe(distinctUntilChanged()).subscribe(
      (event) => {
        if(event instanceof NavigationEnd) {
          if(!event.url.includes("recherche")){
            this.clearSearch();
          }
        }
      }
    )
   }

  clearSearch() {
    this.searchQuery = "";
    this.inputWidth = "0";
    this.searchIsOpen = false;
    // this.router.navigate(['/accueil']);
  }

  setInputWidth() {
    this.searchIsOpen = !this.searchIsOpen;
    this.inputWidth = this.searchIsOpen ? "90%" : "0";
    if(this.searchIsOpen){this.searchField.nativeElement.focus();}
  }

  getInputWidth() {
    return {width: this.inputWidth};
  }

  goToSearch() {
    this.searchQuery ? this.router.navigate(['/recherche'], { queryParams: { q: this.searchQuery } }) : this.router.navigate(['/accueil']);
  }
}
