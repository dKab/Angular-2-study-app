import { Injectable } from '@angular/core';

@Injectable()
export default class AuthService {
  private storageKey: string;
  redirectUrl: string;


  constructor() {
    this.storageKey = 'username';
  }

  startUserSession(userName: string) {
    localStorage.setItem(this.storageKey, userName);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.storageKey);
  }

  getCurrentUserName() {
    return localStorage.getItem(this.storageKey);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}
