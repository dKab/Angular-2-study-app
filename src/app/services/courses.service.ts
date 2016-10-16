import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Course from '../model/course';

@Injectable()
export default class CoursesService {

  private coursesUrl = 'http://localhost:3016/courses';  // URL to web api

  constructor(private http: Http) { }

  getCourses(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
      .map((r: Response) => r.json() as Course[]);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get(`${this.coursesUrl}/${id}`)
      .map((r: Response) => r.json() as Course);
  }

  deleteCourse(id: number)  {
      const url = `${this.coursesUrl}/${id}`;
      return this.http.delete(url);
  }
}
