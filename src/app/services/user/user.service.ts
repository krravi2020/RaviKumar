// Imports
import { Injectable,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers} from '@angular/http';
import { ApiResponse } from '../../models/ApiResponse';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import basic endpoint to extend from 
import {Endpoint} from '../endpoint.service';

declare var localStorage: any;

@Injectable()
export class UserService extends Endpoint{
    private loggedIn = false;
    public userEvent: EventEmitter<User> = new EventEmitter();
    
    // Resolve HTTP using the constructor
    constructor (public http: Http) {
        super(http);
        this.loggedIn = !!localStorage.getItem('ss-user');
    }
    
    //--------------------------------------------------------
    
    
    //--------------------------------------------------------
    
     // google Login
    googleLoginSubmit(data:any) : Observable<User> {
        let body = data;
        
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/googlelogin" ,body,{headers:this.headers})
        .map((res:Response) => this.handleFBLoginResponse(res.json()))
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //--------------------------------------------------------
    
    city(data:any) : Observable<ApiResponse<any>> {
    let body = {"country":data};
  // alert("citylist-"+data);
       return this.http.post(this.baseURL+"city/lists",body,{headers:this.headers})
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //--------------------------------------------------------
    
    // caluclation service
     //--------------------------------------------------------
    
    caluclation(data:any) : Observable<ApiResponse<any>> {
    let body = data;
   
  
  

       return this.http.post(this.baseURL+"Calculate",body,{headers:this.headers})
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //--------------------------------------------------------
    
    
    
    // Login
    loginSubmit(data:any) : Observable<User> {
        let body = data;
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/login" ,body,{headers:this.headers})
        .map((res:Response) => this.handleLoginResponse(res.json()))
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    } 
     // Facebook Login
    fbLoginSubmit(data:any) : Observable<User> {
    
   
        let body = data;
        
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/fblogin" ,body,{headers:this.headers})
        .map((res:Response) => {                                                          
 	let body :  ApiResponse<any>= res.json();                                       
              //alert("from body");
              //alert("serv "+JSON.stringify(body));
              
              if(body.data.fbMobile){
              
            //alert("inside-->>");
              	var email=body.data.email;
              	var picture=body.data.picture;
              	var name=body.data.name;
              	var id=body.data.id;
              	
              	
              	localStorage.setItem('fbemail',email );
              	localStorage.setItem('fbpicture',picture );
              	localStorage.setItem('fbname',name );
              	localStorage.setItem('fbsecret',id );
              	return body.data;
              }else{
             // alert("else-->> ");
             // alert(JSON.stringify(body));
              	return this.handleFBLoginResponse(body);
              }                                                          
 		                                                                  
                                                                                   
 })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
        //.map((res:Response) => this.handleFBLoginResponse(res.json()))
        //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    
    
    fbSigin(data:any) : Observable<any>{
      
       
         let body = data;
       
        return this.http.post(this.baseURL+"user/fbSigin" ,body,{headers:this.headers})
          .map((res:Response) => {                                                          
 	let body : any = res.json();                                       
               
               
              // alert(JSON.stringify(body));
              if(body.status==true){
                 if(body.action==true){
              	 this.handleFBLoginResponse(body);
              	 }
              	 return body;
              }   
              else{                                                      
 		return body;
 		}                                                                  
                                                                                   
 }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));   
    }
    
    
    markAsFBUser(userid:any) : Observable<User>{
        let body = {fbAuth:true};
        //Make a post request to check login status of given credentials
        return this.http.put(this.baseURL+"user/"+userid ,body,{headers:this.headers})
        .map((res:Response) => this.handleFBLoginResponse(res.json()))
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    //get user
    
    getUser(userid:any) : Observable<ApiResponse<any>>{
        let body = {id:userid};
       
        return this.http.post(this.baseURL+"user/getUser",body,{headers:this.headers})
        .map((res:Response) => {                                                          
 	let body : ApiResponse<any> = res.json();                                       
                                                                         
 		return body.data;                                                                  
                                                                                   
 }) 
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    
    
    // Register
    registerSubmit(data:any) : Observable<any> {
        let body = data;
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/register" ,body,{headers:this.headers})
          .map((res:Response) => {                                                          
 	let body : any = res.json();                                       
                                                                       
 		return body;                                                                  
                                                                                   
 })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));                                                                
                                                                                                                                                                     

    }


 
    // Otp resend
    resendOtp(data:any) : Observable<any> {
        let body = data;
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/resendOtp" ,body,{headers:this.headers})
          .map((res:Response) => {                                                          
 	let body : any = res.json();                                       
                                                                         
 		return body;                                                                  
                                                                                   
 })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));                                                                
                                                                                                                                                                     

    }




    // Get Local Storage Details
    getLocalUser():any{
        return JSON.parse(localStorage.getItem('ss-user'));
    }

    // Delete Local Storage Details
    deleteLocalUser():any{
        localStorage.removeItem('ss-user');
    }

    // Check for logged In
    isLoggedIn() {
        return this.loggedIn;
    }

    //edit profile
    
    editProfile(data:any) : Observable<ApiResponse<any>> {
        let body = data;
        
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/editProfile" ,body,{headers:this.headers})
         .map((res:Response) => {                                                          
 	let body : ApiResponse<any> = res.json();                                       
            //alert(JSON.stringify(body));                                                          
 		return body;                                                                  
                                                                                   
 })                                                                                
 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));    

    }

    // Handle Login Response and set Local Storage
    private handleLoginResponse(response : ApiResponse<any>): boolean{
        
        if(!response.status){
            return false;
        }
        
        localStorage.setItem('ss-user',JSON.stringify(response.data));
        
       
        this.loggedIn = true;
        return response.data;
    } 
    
//otp--------------------------------------------------------
    
    otp(data:any) : Observable<ApiResponse<any>> {
    
        let body = data;
        //alert("subimt");
        //Make a post request to check login status of given credentials
        return this.http.post(this.baseURL+"user/otp" ,body,{headers:this.headers})
        .map((res:Response) => this.handleLoginResponse(res.json()))
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    
    
    
    //--------------------------------------------------------  
    
     forgotPassword(email:string) : Observable<ApiResponse<any>> {
   
        return this.http.post(this.baseURL+"user/forgotPassword" ,{"emailorNumber":email},{headers:this.headers})
        .map((res:Response) => {                                                          
 	let body : ApiResponse<any> = res.json(); 
 	//alert(body.status);
 	//alert(body.alredyExist);
 	    if(body.status==false){                                      
       return {status:body.status};
        }
        else{
        	 return {status:body.status};
        }                                                                  
 		//return body;                                                                  
                                                                                   
 })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    //---------------------------------------------------------------
     changePassword(data:any) : Observable<ApiResponse<any>> {
         let body = data;
        return this.http.post(this.baseURL+"user/changepass" ,body,{headers:this.headers})
        .map((res:Response) => {                                                          
 	let body : ApiResponse<any> = res.json(); 
 	    if(body.status==false){                                      
       return {status:body.status};
        }
        else{
        	 return {status:body.status};
        }                                                                  
 		//return body;                                                                  
                                                                                   
 })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
      
    //---------------------------------------------------------------

    // Handle Login Response and set Local Storage
    private handleFBLoginResponse(response : ApiResponse<any>): boolean{
        if(!response.status){
            return false;
        }
        if(!response.data.fbAuth){
            this.markAsFBUser(response.data.id);
        }
        localStorage.setItem('ss-user',JSON.stringify(response.data));
        this.loggedIn = true;
        return response.data;
    } 

    // Observable
    private user: User;
    private subject: Subject<User> = new Subject<User>();

    setuser(user: User): void {
    
        this.user = user;
       
        this.subject.next(user);
    }



    getuser(): Observable<User> {
        return this.subject.asObservable();
    }
}