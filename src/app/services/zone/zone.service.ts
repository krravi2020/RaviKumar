// Imports
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers} from '@angular/http';
import { ApiResponse } from '../../models/ApiResponse';
import { Zone } from '../../models/zone';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import basic endpoint to extend from 
import {Endpoint} from '../endpoint.service';

declare var localStorage: any;

@Injectable()
export class ZoneService extends Endpoint{
    // Resolve HTTP using the constructor
    constructor (public http: Http) {
        super(http);
    }
    getZones(): Observable<Zone[]> {
        return this.http.get(this.baseURL+"zone")
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}