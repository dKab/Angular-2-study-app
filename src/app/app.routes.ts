import { Routes, RouterModule } from '@angular/router';
import { Courses } from './courses';
import { Login } from './login';
import { CourseDetail } from './course-detail';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: Courses },
  { path: 'courses', component: Courses },
  { path: 'login', component: Login },
  { path: 'course-detail', component: CourseDetail},
  { path: '**', component: NoContent },
];
