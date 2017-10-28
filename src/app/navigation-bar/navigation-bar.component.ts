import { Component, OnInit } from '@angular/core';
import {LoginRegisterService} from '../register/login-register.service';
import {RegisterListener} from '../listeners/registerListener';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  login: string;
  subscription: Subscription;

  constructor(private registerLoginService: LoginRegisterService,
              private registerListener: RegisterListener) { }

  ngOnInit() {
    this.login = localStorage.getItem('login');
    this.subscription = this.registerListener.getIsItLogin().subscribe(message => {
      this.login = message.text;
    });
  }

  logout() {
      this.registerLoginService.logout().then((resp) => {
        localStorage.removeItem('id');
        localStorage.removeItem('login');
        localStorage.removeItem('name');
        window.location.reload();
      });
  }
}
