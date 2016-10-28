import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import CourseService from './services/course.service';
import AuthService from './services/auth.service';
import Notifications from './services/notifiacation.service';
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
       <nav class="header__breadcrumbs">
        <a *ngIf="url.indexOf('/course') === 0" routerLink="/courses" 
        class="breadcrumbs__anchor"  routerLinkActive="active">Курсы</a>
        <span *ngIf="url.indexOf('/course/') === 0" class="breadcrumbs__anchor" 
        routerLinkActive="active"> > {{ courseService.name }}</span>
       </nav>
       <section *ngIf="auth.isLoggedIn()" class="header__user-block">
          <span class="user-name">{{ auth.getCurrentUserName() }}</span>
          <a href="javascript:void(0);" (click)="logout()">Logout</a>
       </section>
      </header>
      <div *ngIf="notifications.message" class="error-notification">
        {{ notifications.message }}
        <button type="button" (click)="notifications.message = null" 
        class="error-notification__close-btn">&times;</button>
      </div>
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

  constructor(private router: Router,
              public courseService: CourseService, public auth: AuthService,
              public notifications: Notifications) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.url = val.urlAfterRedirects;
        this.notifications.message = null;
      } else {
        this.url = val.url;
      }
    }, err => console.error(err));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
