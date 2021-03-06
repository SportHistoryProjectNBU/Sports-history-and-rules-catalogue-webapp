import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from '../register/login-register.service';
import {RegisterListener} from '../listeners/registerListener';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {User} from "../entities/user";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  login: string;
  subscription: Subscription;
  name: string;
  isAdmin: string;

  constructor(private registerLoginService: LoginRegisterService,
              private registerListener: RegisterListener,
              private router: Router) {
  }

  ngOnInit() {
    this.login = localStorage.getItem('login');
    this.name = localStorage.getItem('name');
    this.subscription = this.registerListener.getIsItLogin().subscribe(message => {
      if (message.text === 'admin') {
        this.isAdmin = 'true';
      }
      this.login = message.text;
      this.name = localStorage.getItem('name');
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

  redirect() {
    this.router.navigateByUrl('/');
  }
}
