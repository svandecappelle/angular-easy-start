import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SETTINGS from '../../global'; //<==== this one

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {

  settings = SETTINGS;

  constructor() { }

  ngOnInit() {

  }

}
