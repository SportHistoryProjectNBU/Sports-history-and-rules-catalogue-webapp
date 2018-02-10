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

  isAdmin(user: User) {
    return this._http.post('/api/users/admin', user, {
      withCredentials: true
    }).map((resp) => resp.json())
      .toPromise();
  }

  getAllUsers() {
    return this._http.get('/api/users/all', {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as User[]);
  }

  disableUser(id: string) {
    return this._http.post('/api/users/disableUser', id, {
      withCredentials: true
    }).toPromise();
  }

  setAdmin(id: string) {
    return this._http.post('/api/users/setAdmin', id, {
      withCredentials: true
    }).toPromise();
  }

  changeUserData(user: User) {
    return this._http.post('/api/users/changeData', user, {
      withCredentials: true
    }).toPromise();
  }
}
