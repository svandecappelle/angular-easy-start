import { Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TableService {

  constructor(private http: Http){ }

  fetch(param: { page?: number, pageSize?: number }, url: string): Observable<any> {
       return this.http
        .get(`${url}/fetch/${param.page}/${param.pageSize}`)
        .map(res => res.json());
   }

}
