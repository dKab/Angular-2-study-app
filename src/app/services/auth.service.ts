export default class AuthService {
  private storageKey: string;

  constructor() {
    this.storageKey = 'username';
  }

  startUserSession(userName: string) {
    localStorage.setItem(this.storageKey, userName);
  }

  isLoggedIn() {
    return typeof localStorage.getItem(this.storageKey) !== 'null';
  }

  getCurrentUserName() {
    return localStorage.getItem(this.storageKey);
  }
}
