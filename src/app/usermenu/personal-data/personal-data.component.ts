import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {LoginRegisterService} from '../../register/login-register.service';
import {RegisterListener} from '../../listeners/registerListener';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor(private userService: LoginRegisterService,
              private navibarListener: RegisterListener) {
  }

  ngOnInit() {
  }


  onSubmit() {
    const user = new User();
    user.id = localStorage.getItem('id');
    debugger;
    user.password = this.password;
    user.name = this.name;
    user.email = this.email;
    this.userService.changeUserData(user).then((resp) => {
      if (this.name) {
        localStorage.setItem('name', this.name);
        this.navibarListener.sendIsItLogin('change');

      }
      alert('Data successfully changed!');
    });
  }
}
