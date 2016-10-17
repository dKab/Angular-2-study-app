import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Author from '../model/author';

@Injectable()
export default class AthorsService {
  private authorsUrl = 'http://localhost:3016/authors';  // URL to web api

  constructor(private http: Http) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get(this.authorsUrl)
      .map((r: Response) => r.json() as Author[]);
  }
}

