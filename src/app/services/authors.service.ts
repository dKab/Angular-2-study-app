import {  Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Author from '../model/author';
import BackendService from './backend.service';
import Notifications from './notifiacation.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import mixin from '../utils';

@Injectable()
export default class AthorsService implements BackendService {
  handleError: () => (error: Response | any) => ErrorObservable;
  private authorsUrl = 'http://localhost:3016/authors';

  constructor(private http: Http, private notifications: Notifications) {
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get(this.authorsUrl)
      .map((r: Response) => r.json() as Author[])
      .catch(this.handleError(this.notifications));
  }
}

mixin(AthorsService, [BackendService]);
