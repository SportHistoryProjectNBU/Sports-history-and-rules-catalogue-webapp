import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../entities/user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginRegisterService {


  constructor(private _http: Http) {

  }

  RegisterNewUser(user: User) {
    return this._http.post('/api/users/register', user,
      {
        withCredentials: true
      }).map((resp) => resp.json())
      .toPromise();
  }

  login(user: User) {
    return this._http.post('/api/users/login', user, {
      withCredentials: true
    }).map((resp) => resp.json())
      .toPromise();
  }

  logout() {
    return this._http.get('/api/logout', {
      withCredentials: true
    }).toPromise();
  }
}
