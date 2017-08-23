import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DataSource } from '@angular/cdk';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User, IPagedResults } from '../../shared/beans';

@Injectable()
export class TableDataService extends DataSource<any> {
  baseUrl: string = '/api/users';

  constructor(private http: Http) { super(); }

  connect() : Observable<User[]> {
    console.log('call api');
      return this.http.get(this.baseUrl + '/list')
         .map((res: Response) => {
             let customers = res.json();
             // this.calculateCustomersOrderTotal(customers);
             return customers;
         })
         .catch(this.handleError);
    }

    disconnect() {

    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }
}

@Component({
  moduleId: module.id,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ TableDataService ]
})
export class TableComponent implements OnInit, AfterViewInit {

  constructor(public dataSource: TableDataService, private detector: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("ok");
  }

  ngAfterViewInit() {
    // TODO: Remove this as it is a workaround to make the table visible when the page got reloaded
    this.detector.detectChanges();
  }
}
