// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Endpoint{
	
	public headers = new Headers({ 
        'Content-Type': 'application/json',
        // 'ss-api-key': this.apikey
    });
     // private instance variable to hold base url
     public baseURL = 'http://127.0.0.1:8080/helloRest/';
     // public apikey = "N0YyMzlCQUMwRTBGNjI0OTJDRjlENkYxQ0Q3MDVDQjQyNUEzMENCRkVDQjI4QzcyNEQxOUM5RjBBMDc5OThBREQ0MjRGMkMxQTlGMzM5ODcxQzQ0MDFEODFFOEYyRTI4ODQxMzlEMkI5OUZBRkYxRDMyQTEwNjUwRTMwNEI0MTY=";

     // Resolve HTTP using the constructor
     constructor (public http: Http) {}
}