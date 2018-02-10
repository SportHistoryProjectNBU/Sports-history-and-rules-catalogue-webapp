import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  personalDataTab: boolean;
  subscribeTab: boolean;

  constructor() {
  }

  ngOnInit() {
    this.personalDataTab = true;
    this.personalDataTab = false;
  }

  personalData() {
    this.subscribeTab= false;
    this.personalDataTab = true;
  }

  subscribe() {
    this.personalDataTab= false;
    this.subscribeTab = true;
  }

}
