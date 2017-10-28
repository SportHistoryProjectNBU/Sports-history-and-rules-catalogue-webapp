import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterListener {
  private subject = new Subject<any>();

  sendIsItLogin(message: string) {
    this.subject.next({text: message});
  }

  getIsItLogin(): Observable<any> {
    return this.subject.asObservable();
  }
}
