import { Routes, RouterModule } from '@angular/router';
import { Courses } from './courses';
import { Login } from './login';
import { CourseDetail } from './course-detail';
import AuthGuard from './services/auth-guard.service';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: Courses, canActivate: [AuthGuard], },
  { path: 'login', component: Login },
  { path: 'course', component: CourseDetail, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetail, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/courses', pathMatch: 'full' },
];
