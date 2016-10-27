import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Auth from './auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    if (this.auth.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
