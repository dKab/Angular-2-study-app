import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Notification from './notifiacation.service';

@Injectable()
export class SafeHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private notifications: Notification) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(res => {
      this.notifyHttpError(res.status);
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, options).catch(res => {
      this.notifyHttpError(res.status);
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs) {
    return super.put(url, body, options).catch(res => {
      this.notifyHttpError(res.status);
    });
  }

  delete(url: string, options?: RequestOptionsArgs) {
    return super.delete(url, options).catch(res => {
      this.notifyHttpError(res.status);
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs) {
    return super.post(url, options).catch(res => {
      this.notifyHttpError(res.status);
    });
  }

  notifyHttpError(status) {
    let statusStr = status + '',
      firstDigit =  status.charAt(0),
      message;

    switch (firstDigit) {
      case 4:
        message = 'Ресурс не найден или нет прав';
        break;
      case 5:
        message = 'Ошибка сервера';
        break;
      default:
        message = 'Что-то пошло не так';
    }
    this.notifications.setMessage(message);
  }
}
