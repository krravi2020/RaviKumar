// Imports
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers} from '@angular/http';
import { ApiResponse } from '../../models/ApiResponse';
import { Locality } from '../../models/locality';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import basic endpoint to extend from 
import {Endpoint} from '../endpoint.service';

declare var localStorage: any;

@Injectable()
export class LocalityService extends Endpoint{
    // Resolve HTTP using the constructor
    constructor (public http: Http) {
        super(http);
    }
   getLocalitiesByCity(cityID : string): Observable<any> {
       //return this.http.get(this.baseURL+"locality/findbycity/58851c6397c9e8fe07d4cbfc")
        
        return this.http.post(this.baseURL+"locality/findbycity" ,{'cityID':cityID},{headers:this.headers})
        .map((res:Response) => {
        	let body : ApiResponse<Locality[]> = res.json();
        	if(body.status==true){
        	
        		return body.data;
        	}else{
        		return [];
        	}
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    //----------------------------------------------------------------------
    serviceDiscription(serviceDescription : string): Observable<string> {
    //  alert("---->>");
        return this.http.post(this.baseURL+"service/description" ,{'serviceDescription':serviceDescription},{headers:this.headers})
        .map((res:Response) => {
        	let body : ApiResponse<any> = res.json();
        //	alert("Details-->> "+JSON.stringify(body));
        	if(body.status==true){
        	return body.data;
        	}else{
        		return "";
        	}
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //------------------------------------------------------------------------
    
    
    getvendorList(vendorLists : any): Observable<Locality[]> {
      
     
      
        return this.http.post(this.baseURL+"vendor/vendorList" ,{'vendorList':vendorLists},{headers:this.headers})
        .map((res:Response) => {
        	let body : ApiResponse<Locality[]> = res.json();
        	//alert("Details-->> "+JSON.stringify(body));
        	if(body.status==true){
        	return body.data;
        	}else{
        		return [];
        	}
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //--------------------------------------------------------------------------
    getCityName(id : any): Observable<ApiResponse<any>> {
       // alert("id-->> getcity    "+id);
        return this.http.post(this.baseURL+"city/getCityName" ,{'id':id},{headers:this.headers})
        .map((res:Response) => {
       
        	let body : ApiResponse<any> = res.json();
        	
        	if(body.status==true){
        	return body.CityName;
        	}else{
        		return "";
        	}
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
   
   //--------------------------ger address------------------------------------------------
    getAddress(id : any): Observable<ApiResponse<any>> {
        
        return this.http.post(this.baseURL+"address/getAddress" ,{'id':id},{headers:this.headers})
        .map((res:Response) => {
       
        	let body : ApiResponse<any> = res.json();
        	
        	if(body.status==true){
        	return body.data;
        	}else{
        		return false;
        	}
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
   
   
   //--------------------------vendoStatus------------------------------------------------
   
   
  
   vendoStatus(data : any): Observable<ApiResponse<any>> {
      let bodys=data; 
        return this.http.post(this.baseURL+"vendor/vendoStatus" ,bodys,{headers:this.headers})
        .map((res:Response) => {
        	let body : ApiResponse<any> = res.json();
        	
        	
        	return body;
        	
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
        
    
}