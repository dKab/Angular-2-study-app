import { Response } from '@angular/http';
import Notifications from './notifiacation.service';
import { Observable } from 'rxjs';


export default class BackendService {
  handleError(notifications: Notifications) {
    return (error: Response | any) => {
      let firstDigit = (error.status + '').charAt(0),
        message: string;

      switch (firstDigit) {
        case '4':
          message = 'Ресурс не найден или нет прав';
          break;
        case '5':
          message = 'Ошибка сервера';
          break;
        default:
          message = 'Что-то пошло не так';
      }

      notifications.setMessage(message);
      return Observable.throw(error);
    };
  }
}
