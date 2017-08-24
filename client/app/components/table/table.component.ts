import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DataSource } from '@angular/cdk';

import { PageEvent, MdPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, IPagedResults } from '../../shared/beans';
import { TableService } from './table.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';


@Injectable()
export class TableDataService extends DataSource<any> {
  baseUrl: string = '/api/users';
  paginator: MdPaginator;
  subject:BehaviorSubject<User[]>;

  constructor(private service: TableService) {
    super();
  }

  setPaginator(paginator: MdPaginator) {
    this.paginator = paginator;
  }

  connect() : Observable<User[]> {
    const displayedChanges = [
      this.paginator.page
      // TODO add sorter
    ];

    this.subject = new BehaviorSubject<User[]>([]);
    Observable.merge(...displayedChanges).subscribe((d) => {
      this.fetch();
    });

    return Observable.merge(this.subject);
  }

  disconnect() {

  }

  fetch() {
    this.service.fetch({ page: this.paginator.pageIndex, pageSize: this.paginator.pageSize }, this.baseUrl).subscribe((datas) => {
      this.subject.next(datas);
    });
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ TableDataService, TableService ]
})
export class TableComponent implements OnInit, AfterViewInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private detector: ChangeDetectorRef, private dataSource: TableDataService) { }

  ngOnInit() {
    this.dataSource.setPaginator(this.paginator);
  }

  ngAfterViewInit() {
    this.dataSource.fetch();
  }
}
