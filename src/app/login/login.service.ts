import User from './user';
import { Observable } from 'rxjs/Rx';

export default class LoginService {
  correctLogin: string;
  correctPassword: string;

  constructor() {
    this.correctLogin = 'q';
    this. correctPassword = 'q';
  }

  login(login: string, password: string): Observable<User> {
    if (login === this.correctLogin && password === this.correctPassword) {
      return Observable.of(new User(login));
    } else {
      return Observable.throw(new Error('You shall not pass!'));
    }
  }
}
