import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Injectable, ViewChild, ViewContainerRef, Compiler, ComponentFactory } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


import { PageEvent, MdPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, IPagedResults } from '../../shared/beans';
import { TableDataService, TableService } from './table.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';

@Injectable()
@Component({
  moduleId: module.id,
  selector: 'app-table[service][val]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  host: {
    "[service]": 'service',
    "[options]": 'options',
    "[val]": "val"
  },
  providers: [ TableService, TableDataService, TableComponent ]
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() val:string;
  @Input() options:Object;
  @Input() service = null;

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;


  @ViewChild('container', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private detector: ChangeDetectorRef, private dataSource: TableDataService, private compiler: Compiler) { }

  ngOnInit() {
    console.log(this.service);
    this.dataSource.setBaseUrl(this.service);
    this.dataSource.setPaginator(this.paginator);
  }

  ngAfterViewInit() {
    this.dataSource.fetch();
  }
}
