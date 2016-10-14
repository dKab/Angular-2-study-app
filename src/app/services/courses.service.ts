import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import Course from '../model/course';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class CoursesService {

  private coursesUrl = 'http://localhost:3016/courses';  // URL to web api

  constructor(private http: Http) { }

  getCourses(): Promise<Course[]> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.get(this.coursesUrl, {
        headers: headers
      })
      .toPromise()
      .then(response => {
        return response.json().data as Course[]
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
