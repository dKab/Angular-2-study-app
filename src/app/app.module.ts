import './rxjs-extensions.ts';

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ReactiveFormsModule } from '@angular/forms';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { Courses } from './courses';
import { Login } from './login';
import { CourseDetail } from './course-detail';
import { NoContent } from './no-content';
import AuthService from './services/auth.service';
import CoursesService from './services/courses.service';
import { CoursesSearch } from './courses/courses-search/courses-search.component';
import { DatePipe } from '@angular/common';
import { Multiselect } from './course-detail/multiselect';
import AuthorsService from './services/authors.service';
import SelectableList from './course-detail/multiselect/selectable-list';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AuthService,
  CoursesService,
  AuthorsService,
  DatePipe
];

type StoreType = {
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    Login,
    Courses,
    CourseDetail,
    CoursesSearch,
    Multiselect,
    SelectableList,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}
}

