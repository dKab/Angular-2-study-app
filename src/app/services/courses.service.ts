import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import Course from '../model/course';

@Injectable()
export default class CoursesService {


  private coursesUrl = 'http://localhost:3016/courses';  // URL to web api

  constructor(private http: Http) { }

  getCourses(): Observable<Response> {
    return this.http.get(this.coursesUrl);
  }

  deleteCourse(id: number)  {
      const url = `${this.coursesUrl}/${id}`;
      return this.http.delete(url);
  }
}
