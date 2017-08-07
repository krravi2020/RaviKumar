// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { ApiResponse } from '../../models/ApiResponse';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import basic endpoint to extend from 
import {Endpoint} from '../endpoint.service'

@Injectable()
export class BookingService extends Endpoint{
    // Resolve HTTP using the constructor
    constructor (public http: Http) {
        super(http);
    }
    
    // Submit the arb form
    bookingSubmit(uid:string,name:string, data:any) : Observable<ApiResponse<any>> {
        let jobs:string[] = [];
        let body = data;
        // body.jobs = jobs;
        body.status="new"
        body.user = uid;
        body.name = name;
      // alert(JSON.stringify(body));
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"booking/",body,{headers:this.headers})
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    } 
    getBookings(uid:string): Observable<ApiResponse<any>> {
	
	let body={"uid":uid}
	
         return this.http.post(this.baseURL+'booking/getBookings',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
            
        		return body.data;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    //---------------------
    // Register                                                                         
registerSubmit(data:any) : Observable<ApiResponse<any>> {                           
    let body = data;                                                                
    //Make a post request to check login status of given credentials                
    return this.http.post(this.baseURL+"user/register" ,body,{headers:this.headers})
    .map((res:Response) => res.json())                                              
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
}                                                                                   
                                                                                    

    //---------------------
    getHistory(uid:string): Observable<ApiResponse<any>> {
	
	let body={"uid":uid}
         return this.http.post(this.baseURL+'booking/getHistory',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
   
        		return body.data;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //-----------=-----
    
    
    
     
    cancel(id:string) : Observable<ApiResponse<any>> {
       
        let body = {"uid":id,"status" : "cancelled"};
      
        return this.http.post(this.baseURL+"booking/changestatus",body,{headers:this.headers})
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    } 
    //----------------
    changeStatus(uid:string): Observable<ApiResponse<any>> {
	////alert(uid);
	let body={"uid":uid,"status":"completed"}
         return this.http.post(this.baseURL+'booking/changestatus',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
        
        		return body.status;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
	//-------------------- payment method change---///
	
	addPaymetType(uid:string): Observable<ApiResponse<any>> {
	
	
	let body={"uid":uid}
	
         return this.http.post(this.baseURL+'booking/addPaymetType',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
                
               
                  	return body;
                  
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
	
	
	//---------------------
	getBookingsForuser(uid:string): Observable<ApiResponse<any>> {
	
	
	let body={"uid":uid}
	
         return this.http.post(this.baseURL+'booking/getBookingsForuser',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
            
        		return body.data;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
	 //----------------
    payUdetails(payDetails:any): Observable<ApiResponse<any>> {
	
	let body=payDetails
         return this.http.post(this.baseURL+'invoice/paydetails',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
              
                 if(body.action!="."){
                
                 
                 	return body;
                 }
        		//return body.status;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //----------------------------
    
   invoicebill(bid:any): Observable<ApiResponse<any>> {
	
	let body={"bid":bid};
	
         return this.http.post(this.baseURL+'user/invoice',body,{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
              
                 
                
                 if(body.status==true){
                 	return body.data;
                 }
                 else{
                 	return {};
                 }
        		//return body.status;
      
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
	//--------------------
	/*
	sendPostPayU(body:any):Observable<ApiResponse<any>> {
		
		//////alert(JSON.stringify(body.action));
		location.href=body.action,{"key":body.MERCHANT_KEY,"hash_string":body.hash_string,"hashh":body.hashh,"posted":body.posted};
		/*this.http.post("http://www.facebook.com",{headers:this.headers})
        .map((res:Response)  => {
        	let body : ApiResponse<any> = res.json();
      
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
		return
	}*/
  
}