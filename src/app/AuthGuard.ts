import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {
  }

  canActivate() {
    if (localStorage.getItem('id') !== null) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
