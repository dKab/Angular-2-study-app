import { Component, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { CourseDetail} from "./course-detail/course-detail.component";
import { ActivatedRoute, UrlSegment, RouterState, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
        <a  routerLink="/courses" class="breadcrumbs__anchor"  routerLinkActive="active">Курсы</a>
        <!--<a *ngIf="courseComponent" routerLink="/course/" class="breadcrumbs__anchor" routerLinkActive="active">{{ courseComponent.course.title }}</a>-->
       </nav>
      </header>
      <main>
        <router-outlet (activate)='onActivate($event)'></router-outlet>
      </main>
    </div>
    <footer class="site-footer">
        Copyright 2016
    </footer>
  `
})
export class App {
  name = 'Angular 2 study app';
  hookedUp = false;

  constructor(public route: ActivatedRoute, router: Router) {
    router.events.subscribe((e) => console.log(e));
  }

  courseComponent: CourseDetail = null;

  onActivate(e) {
    //console.log('route activated', JSON.stringify(e));
    if  (e instanceof CourseDetail) {
      this.courseComponent = e;
      setTimeout(() => console.log(this.courseComponent.course.title), 0);
    }
  }

}
