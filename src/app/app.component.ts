import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor() {}

}
