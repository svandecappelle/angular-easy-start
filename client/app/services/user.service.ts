import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../shared/models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
}
