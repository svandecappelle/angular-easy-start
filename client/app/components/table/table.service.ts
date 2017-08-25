import { Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


import { PageEvent, MdPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, IPagedResults } from '../../shared/beans';
import { DataSource } from '@angular/cdk';

@Injectable()
export class TableService {
  baseUrl: string;

  constructor(private http: Http){ }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  fetch(param?: { page?: number, pageSize?: number }): Observable<any> {
    let fetchUrl = `${this.baseUrl}/`;
    if (param){
      fetchUrl += `fetch/${param.page}/${param.pageSize}`;
    } else {
      fetchUrl += 'list'
    }
       return this.http
        .get(fetchUrl)
        .map(res => res.json());
   }

}

@Injectable()
export class TableDataService extends DataSource<any> {
  baseUrl: string;
  paginator: MdPaginator;
  subject:BehaviorSubject<User[]>;

  constructor(private service: TableService) {
    super();
  }

  setPaginator(paginator: MdPaginator) {
    this.paginator = paginator;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
    this.service.setBaseUrl(this.baseUrl);
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
    this.service.fetch({ page: this.paginator.pageIndex, pageSize: this.paginator.pageSize }).subscribe((datas) => {
      this.subject.next(datas);
    });
  }
}
