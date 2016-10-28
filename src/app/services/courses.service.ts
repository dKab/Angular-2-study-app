import {  Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Course from '../model/course';
import Notifications from './notifiacation.service';
import BackendService from './backend.service';
import mixin from '../utils';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export default class CoursesService implements BackendService {
  handleError: () => (error: Response | any) => ErrorObservable;
  private coursesUrl = 'http://localhost:3016/courses';

  constructor(private http: Http, private notifications: Notifications) {}

  getCourses(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
      .map((r: Response) => r.json() as Course[])
      .catch(this.handleError(this.notifications));
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get(`${this.coursesUrl}/${id}`)
      .map((r: Response) => r.json() as Course)
      .catch(this.handleError(this.notifications));
  }

  deleteCourse(id: number)  {
      const url = `${this.coursesUrl}/${id}`;
      return this.http.delete(url)
      .catch(this.handleError(this.notifications));
  }

  addCourse(course: Course) {
    return this.http.post(this.coursesUrl, course)
      .map((r: Response) => r.json() as Course)
      .catch(this.handleError(this.notifications));
  }

  updateCourse(course: Course) {
    return this.http.put(`${this.coursesUrl}/${course.id}`, course)
      .map((r: Response) => r.json() as Course)
      .catch(this.handleError(this.notifications));
  }
}

mixin(CoursesService, [BackendService]);
