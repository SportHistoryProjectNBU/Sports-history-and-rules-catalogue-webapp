import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from '../register/login-register.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../entities/user';
import {RegisterListener} from '../listeners/registerListener';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginRegisterService: LoginRegisterService,
              private router: Router,
              private loginListener: RegisterListener) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    });
  }

  onSubmit() {
    const user = new User();
    user.username = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    this.loginRegisterService.login(user).then((resp) => {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('login', 'true');
      localStorage.setItem('name', resp.name);
      localStorage.setItem('userName', resp.userName);
      this.loginListener.sendIsItLogin('true');
      this.router.navigateByUrl('');
    });
  }
}
