import {Component, OnInit} from '@angular/core';
import {LoginRegisterService} from '../register/login-register.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: LoginRegisterService) {

  }

  ngOnInit() {

    this.userService.getAllUsers().then((resp) => {
      this.users = resp;
    });
  }

  banUser(user: User) {
    this.userService.disableUser(user.id).then((resp) => {
      if (user.disabled === false) {
        user.disabled = true;
        alert('User successfully disabled!');

      } else {
        user.disabled = false;
        alert('You have successfully removed disabled from user!');
      }
    });
  }

  setAdmin(user: User) {
    this.userService.setAdmin(user.id).then((resp) => {
      if (user.role === 'ADMIN') {
        user.role = 'USER';
        alert('You have have successfully removed an admin access from user');
      } else {
        user.role = 'ADMIN';
        alert('You have have successfully promote a user to admin!');
      }
    });
  }
}
