import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import CourseService from "./services/course.service";
import CourseService from "./services/course.service";
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <div class="page-wrap">
      <header class="header">
       <div class="header__logo"></div>
       <h1 class="header__text">Logo</h1>
       <nav class="breadcrumbs">
        <a *ngIf="url.indexOf('/course') === 0" routerLink="/courses" class="breadcrumbs__anchor"  routerLinkActive="active">Курсы</a>
        <span *ngIf="url.indexOf('/course/') === 0" class="breadcrumbs__anchor" routerLinkActive="active">{{ courseService.name }}</span>
       </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
    <footer class="site-footer">
        Copyright 2016
    </footer>
  `
})
export class App {
  name = 'Angular 2 study app';
  url = '';

  constructor(private router: Router, public courseService: CourseService) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.url = val.urlAfterRedirects;
      } else {
        this.url = val.url;
      }
    }, err => console.error(err));
  }
}
