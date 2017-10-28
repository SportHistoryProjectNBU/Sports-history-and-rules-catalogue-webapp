import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../entities/user';
import {LoginRegisterService} from './login-register.service';
import {Router} from '@angular/router';
import {RegisterListener} from '../listeners/registerListener';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private loginRegisterService: LoginRegisterService,
              private router: Router,
              private listener: RegisterListener) {
  }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    });
  }

  onSubmit() {
    const user = new User();
    user.username = this.createUserForm.value.username;
    user.name = this.createUserForm.value.name;
    user.password = this.createUserForm.value.password;
    user.email = this.createUserForm.value.email;
    this.loginRegisterService.RegisterNewUser(user).then((resp) => {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('login', 'true');
      localStorage.setItem('name', resp.name);
      this.listener.sendIsItLogin('true');
      this.router.navigateByUrl('');
    });
  }

}
