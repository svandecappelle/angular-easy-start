import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SETTINGS from '../../global'; //<==== this one

import { User } from '../../shared/models/index';
import { UserService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  settings = SETTINGS;

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

}
