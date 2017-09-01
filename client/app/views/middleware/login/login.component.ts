import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MdFormField } from '@angular/material';


import { AlertService, AuthenticationService } from '../../../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading: boolean = false;
  error: any = {};

  @ViewChild('passwdControl') passwdControl: MdFormField;
  @ViewChild('usernameControl') usernameControl: MdFormField;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
    .subscribe(
        data => {
          // window.location.href = this.returnUrl
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // TODO retrieve from service error.
          // this.alertService.error(JSON.parse(error._body).message);
          this.error = {
            username: false,
            password: true
          }
          if (this.error.username) {
            this.usernameControl._control.ngControl.reset();
          }
          if (this.error.password) {
            this.passwdControl._control.ngControl.reset();
          }
          this.loading = false;
        });
    }
}
