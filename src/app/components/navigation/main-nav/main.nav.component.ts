import { Component,ElementRef,OnInit, animate, state, style, transition, trigger ,AfterViewInit } from '@angular/core';
import { Title,BrowserModule }     from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { LocalityService } from '../../../services/locality/locality.service';
import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';

import { User } from '../../../models/user';
import { ApiResponse } from '../../../models/ApiResponse';

declare var FB: any;
declare const gapi: any;


@Component({
	moduleId: module.id,
	selector: 'main-nav',
	templateUrl: 'main-nav.html',
	styleUrls: [ './style.css' ],
})
export class MainNavComponent implements AfterViewInit {
    
    public Styles:boolean=false;
	public showLoginModal: boolean=false;
	public showRegisterModal: boolean=false;
	public loginForm:any;
	public fbwrongOtp:string="";
	public user:User;
	public seletectedCity:string="SELECT CITY";
	public loginStatus:boolean;
	public registerForm:any;
	public selectedCountry: any;
	public bookingStatus:any;
	public cityName: any;
	public phn:any;
	public fbOtpModal:boolean=false;
	public fbSigins:any;
	public fbRespon:any;
	public loginForms:any;
	
	
	// public googleLoginButtonId:string=  "google-login-button";
    // public userAuthToken:string = null;
 // public userDisplayName:string = "empty";

	
	public bookingStatusLength:number;
	public nameRequried:string;
	public phoneRequried:string;
	public passwordRequrithis:string;
	public passwordRequried:string;
	public emailRequried:string;
	public localcity:string="";
	public checkfbLogin:boolean=false;
	
	public Fbotp:string="";
	
	public countries:any;
	//public selectCity:string='new York';
	public resetpassword:boolean=false;
	public emailRequriedExists:string;
	public nameRequriedExists:string;
	public phoneRequriedExits:string;
	public showOtpModal: boolean=false;
	public changepassword :boolean=false;
	public emailValid:string;
	public emailmessage:string="";
	public wrongOtp:string;
	public wrongNumber:string;
	public changeuserPassword:any;
	public emailnotvalid:string="";
	public loginCredintial:string="";
	public pleaseRegis:string="";
	public pleaseRegis1:string="";
	public oldPassword:string="";
	public oldPasswords:string="";
	public alredyExist:string;
	//public initAPI:any;
	
	public fbMobile:boolean=false;
	//public googleLogin:any;
	public citys:any[]=[];
	
	 
  public auth2: any;
  


 public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "903299216267-ita4qb1m2tcs55hhdkbc2hriuuotgur6.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      that.googleSignin(document.getElementById('googleBtn'));
    });
  }
  



	constructor(private titleService: Title,private element: ElementRef,private localityService:LocalityService,public userService:UserService, private router: Router,private bookingService:BookingService,private _sanitizer: DomSanitizer) {
		this.titleService.setTitle('welcome');
		
		this.fbSigins={
			status:false
		};
		
		this.loginForm = {
			credential: "",
			password: ""
		};
		
		this.loginForms={
			credential:""
		};
		this.nameRequried="";
		this.phoneRequried="";
		this.passwordRequrithis="";
		this.passwordRequried="";
		this.emailRequried="";
		this.emailRequriedExists="";
		this.phoneRequriedExits="";
		this.nameRequriedExists="";
		
		this.alredyExist="";
		this.phn={value:[]};
		this.emailValid="";
		this.wrongOtp="";
		this.changeuserPassword={
			oldPassword:"",
			newPassword:"",
			email:""
			
		};
		this.fbRespon={
			
		};
		
		
		this.registerForm = {
			phone: "",
			email: "",
			password: ""
		};
		if(localStorage.getItem("localcity")){
		
		this.localcity=localStorage.getItem("localcity");
		}
		else{
			this.localcity="";
		}
		
		if(localStorage.getItem('cityName')){
			this.seletectedCity=localStorage.getItem('cityName');
			
		}else{
			this.seletectedCity="SELECT CITY";
		}
			//----------------------------------------------------------------
			
	this.userService.city("India")
		.subscribe(
			response  => {
				
				// ////alert("my jason  "+ JSON.stringify(response));
				 
				    this.countries= response;
				   
			 
				for(var i=0;i<this.countries.length;i++){
				
				if(this.countries[i].name==localStorage.getItem('cityName')){
					
				}
				else{
					this.countries
					this.citys.push(this.countries[i]);
				}
					
				
				};
				this.countries=this.citys;
				
			},
			error =>  {
				console.log(error);
			}
		);
	
	
	
	//----------------------------------------------------------------
	
		this.bookingStatus=[];
		this.bookingStatusLength=this.bookingStatus.length;
		this.countries=[{id:"1",name:"Bangalore"},{id:"2",name:"Pune"},{id:"3",name:"Raipur"}];
		
		
		
		//---------from cons----------
		 var meta = document.createElement("meta");

   meta.name= "google-signin-client_id";
   meta.content= "903299216267-ita4qb1m2tcs55hhdkbc2hriuuotgur6.apps.googleusercontent.com";
   
   document.getElementsByTagName("head")[0].appendChild(meta);
   
     var script = document.createElement("script");
    script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://apis.google.com/js/platform.js";
    
    
		this.setupUserInstance();
		this.userService.userEvent.subscribe((user:User) => {
			this.user = user;
			this.setupUserInstance();
		});
		this.selectedCountry = this.countries[1];
		//alert("user id "+(this.user.id));
		this.bookingService.getBookings(this.user.id).subscribe(response  => {
				
				    this.bookingStatus= response;
				   
				    if(this.bookingStatus!=undefined){
			        this.bookingStatusLength=this.bookingStatus.length;
				};
			},
			error =>  {
				console.log(error);
			});
		//-------------end -------
		
		
	}
	
	

	
	ngAfterViewInit(){
  
  this.googleInit();
 

  }
  
  
  fbOtpModaldiss(){
  	this.fbOtpModal=false;
  	
  }
 
 

	setupUserInstance(){
		this.user = this.userService.getLocalUser();
		if(!this.user || this.user.id == ''){
			this.loginStatus = false;
			this.user = {
				id: "",
				name: "",
				email: "",
				phone: null,
			};
		}else{
			this.loginStatus = true;
		}
		this.userService.getuser().subscribe((user:User) =>{
			if(!user || user.id == ''){
				this.loginStatus = false;
			}else{
				this.loginStatus = true;
			}
		});
	}



 public googleSignin(element:any) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser:any) {
      
    
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        
        that.userService.googleLoginSubmit({'id':profile.getId(),'name':profile.getName(),'imageUrl':profile.getImageUrl(),"email":profile.getEmail()})
        .subscribe((response : any) => {
				
				if(response) {
									if(response.email){
									    //alert(response.name);
									   // alert(JSON.parse(response));
										that.userService.setuser(response);
										that.loginModal();
										location.reload();
									}else{
										console.log(response);
									}
								}else{
								//alert("from else ");
								
								
									console.log(response);
								}
			
			},
			(error :any) =>  {
				console.log(error);
			});
		


      }, function (error:any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  
  
  eventHandler($event:any) {
  let keycode = ($event.which) ? $event.which : $event.keycode;
   
    this.phn = document.getElementById('phone');
   
   if (!(keycode==8 || keycode==46)&&(keycode < 48 || keycode > 57))
{
return false;
}
else
{

if (this.phn.value.length <10)
{
return true;
}
else
{
return false;
}
}
} 



 eventHandler1($event:any) {
 
 
  let keycode = ($event.which) ? $event.which : $event.keycode;
   
    this.phn = document.getElementById('phone1');
   
   if (!(keycode==8 || keycode==46)&&(keycode < 48 || keycode > 57))
{
return false;
}
else
{

if (this.phn.value.length <10)
{
return true;
}
else
{
return false;
}
}
} 




 eventHandler2($event:any) {
 
 
  let keycode = ($event.which) ? $event.which : $event.keycode;
   
    this.phn = document.getElementById('phone2');
   
   if (!(keycode==8 || keycode==46)&&(keycode < 48 || keycode > 57))
{
return false;
}
else
{

if (this.phn.value.length <10)
{
return true;
}
else
{
return false;
}
}
} 


eventHandler3($event:any) {
 
 
  let keycode = ($event.which) ? $event.which : $event.keycode;
   
    this.phn = document.getElementById('phone3');
   
   if (!(keycode==8 || keycode==46)&&(keycode < 48 || keycode > 57))
{
return false;
}
else
{

if (this.phn.value.length <10)
{
return true;
}
else
{
return false;
}
}
} 



	checkFacebookState() {
	
		FB.login((response: any) => {
		   //alert("first -->>  "+JSON.stringify(response));
		   //fbMobile
			this.getFBDetails(response.authResponse.userID);
			this.showLoginModal =false;
			this.fbMobile=true;
			//alert("else-->> "+this.checkfbLogin);
			
		},{scope: 'public_profile,email,user_friends'});
	}


public fbWithMobile(){

console.log(localStorage.getItem('fbemail'));
console.log(localStorage.getItem('fbpicture'));
console.log(localStorage.getItem('fbname'));
console.log(localStorage.getItem('fbsecret'));


//alert(this.Fbotp);
if(this.loginForms.credential.length==10){
	//alert(this.loginForms.credential);
	
	
	var data={"credential":this.loginForms.credential,"email":localStorage.getItem('fbemail'),"picture":localStorage.getItem('fbpicture'),"name":localStorage.getItem('fbname'),"secret":localStorage.getItem('fbsecret'),"otp":this.Fbotp};
	
	this.userService.fbSigin(data)
						.subscribe(
							response  => {
							this.fbSigins=response;
							//alert(this.fbSigins.action=="otpwrong");
							if(this.fbSigins.status==true){
								this.fbMobile=false;
								if(this.fbSigins.action==false){
								//alert("f---");
								this.fbOtpModal=true;
								}
								else if(this.fbSigins.action=="otpwrong"){
								//alert("e---")
									this.fbwrongOtp="Sorry otp wrong!!!";
								}
								else{
								location.reload();
								}
							}
							else{
								
								this.wrongNumber="Mobile number alredy exist!!!"
								
							}
							},
							error =>  {
								console.log(error);
							}
						);
				
	
}else{
	this.wrongNumber="Please enter valid mobile number!!!"
}




	
}

	getFBDetails(userID:any) {
	
		FB.api("/"+userID,'get',{"fields":"id,name,email,picture"},
				(response:any) 	=> {
					if (response && !response.error) {
						/* handle the result */
						this.userService.fbLoginSubmit(response)
						.subscribe(
							response  => {
							this.fbRespon=response
							
								if(this.fbRespon) {
								
									if(!this.fbRespon.fbMobile){
									
										this.userService.setuser(response);
										
										
										
  	
  	
  	this.checkfbLogin=true;
										
										location.reload();
									}else{
									
									//alert("from else");
									
									this.checkfbLogin=false;
									
									
									
										console.log(response);
									}
								}else{
								
								
								
									console.log(response);
								}
							},
							error =>  {
								console.log(error);
							}
						);
					}
				}
			);
	}

	checkGoogleState(){

	}
fbMobileDiss(){

this.fbMobile=false;
}

localitySelectHandler = function(locality:any){
  //alert(locality);
	localStorage.setItem("localcity",locality)
	//this.user.city=locality;

		
	};
	
	
	autocompleListFormatter = (data: any) : SafeHtml => {
	 
		let html = `<span>${data.name.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}
dropdown(): void{
	this.Styles=!this.Styles;
}
	login(): void{
	
	if(this.loginForm.credential==""){
		this.loginCredintial="mobile number shuld not be empty!!";
	}
	else if(this.loginForm.password==""){
		this.loginCredintial="password shuld't empty!!";
	}
		else{
		
		
		this.userService.loginSubmit(this.loginForm)
		.subscribe(
			response  => {
				this.userService.setuser(response);
				if (response) {
					console.log(response);
					this.loginModal();
					this.setupUserInstance();
					 location.reload();
				}
				else{
					this.loginCredintial="invalid mobile number or password !!!";
				};
			},
			error =>  {
				console.log(error);
			}
		);}
	}

	public logout(){
		this.userService.deleteLocalUser();
		var user: User = {
			id: "",
			name: "",
			email: "",
			phone: null,
		};

		this.userService.setuser(user);
		FB.logout();
		
	}

	register(): void{
	
	
	
	if(this.registerForm.name==""||this.registerForm.name==null){
	 
		this.nameRequried="please enter name";
	}
	
	 else if(/^[a-zA-Z ]{4,16}$/.test(this.registerForm.name)){
	// alert(this.registerForm.name.length);
	// alert(this.registerForm.name);
	 if(/^\s*$/.test(this.registerForm.name)){
		
	
	
	
	this.nameRequried="Name must be four characters!!!";
	
	
	}else{
		
		this.nameRequriedExists="";
				this.emailRequriedExists="";
				this.phoneRequriedExits="";
				
	   if(this.registerForm.phone==""||this.registerForm.phone==null){
	  this.nameRequried="";
	 
		this.phoneRequried="please enter mobile number";
	}
	else if(this.registerForm.phone.length<10){
		this.phoneRequried="please enter 10 digit's mobile number";
	}
	else if(this.registerForm.email==""||this.registerForm.email==null){
	this.nameRequried="";
	this.phoneRequried="";
	//this.passwordRequrithis.selectedCountry = this.countries[1];
	 
		
	this.emailRequried="please Enter email"
		
	}
	
	else if(this.registerForm.password==""||this.registerForm.password==null){
	this.nameRequried="";
	this.phoneRequried="";
	 this.emailRequried="";
		this.passwordRequried="please enter password";
	}
	
	else{
	this.nameRequried="";
	this.phoneRequried="";
	this.passwordRequried="";
	this.emailRequried="";
	
	
	
 if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z])+\.([A-Za-z]{2,4})$/.test(this.registerForm.email)){
           if(/^[0-9a-zA-Z@$#&!*]{6,16}$/.test(this.registerForm.password)){
	
	
		this.userService.registerSubmit(this.registerForm)
		.subscribe(
			response  => {
			//alert("hiii");
			//alert(JSON.stringify(response));
			
			    
				if(response.alredyExist=='name'){
			
			this.selectedCountry = this.countries[1];
					this.nameRequriedExists="Name alredy exists";
				
				this.emailRequriedExists="";
				this.phoneRequriedExits="";
				}
				else if(response.alredyExist=='mail'){
				
			
					this.emailRequriedExists="Email alredy exists";
					this.nameRequriedExists="";
			
				this.phoneRequriedExits="";
				}else if(response.alredyExist=='phone'){
			
					this.phoneRequriedExits="Sorry your mobile number is already registered!!!";
					this.nameRequriedExists="";
				this.emailRequriedExists="";
				
				} else{
				this.nameRequriedExists="";
				this.emailRequriedExists="";
				this.phoneRequriedExits="";
				
				this.loginModal();
		        this.showOtpModal = !this.showOtpModal; 
				}
				
				
			},
			error =>  {this.selectedCountry = this.countries[1];
				console.log(error);
			}
		);}
		else{
					this.passwordRequried="Password should be minimum 6 characters and maxmum 16 characters!!!";

		}		
	
		       
       } else{
       //alert("invalid");
       	this.emailRequried="Invalid email";
       	  
       }
	
       
	}
		
	}
	
	
	
	
	
	
	
	}
	else{
	this.nameRequried="Allowed only character's";
	}
	};
	
	//--------------------------------------------------------------
otp(): void{
	////alert("otp-->"+JSON.stringify(this.registerForm));
	
		this.userService.otp(this.registerForm)
		.subscribe(
			response  => {
				//this.userService.setuser(response);
				
				
				    
				    if(response){
				    
					this.wrongOtp="";
					
					
					
					this.userService.setuser(response.data);
					this.showOtpModal=false;
										
										
					this.setupUserInstance();
					location.reload();
					
					
					}
					else{
					
						this.wrongOtp="Otp wrong";
					
					}
				
			},
			error =>  {
				console.log(error);
			}
		);
	}
//----------------------------------------------------------changeuserPassword----
	//-------------
    public otpModeldiss(){
    	
    	this.showOtpModal=!this.showOtpModal;
    }
	public loginModal(){
		this.showLoginModal = !this.showLoginModal;
	}

	public registerModal(){
		this.showRegisterModal = !this.showRegisterModal;
	}
	onInput=($event:any)=>{
	
	$event.preventDefault();

   
   
	
	//localStorage.setItem('city', $event.target.value);
	 localStorage.setItem("cityID", $event.target.value);
	 this.localityService.getCityName(localStorage.getItem('cityID')).subscribe(
 			
 			cityname => {
 			
 				this.cityName = cityname;
 				localStorage.setItem('cityName',this.cityName);	
 				//alert(this.cityName);
 				this.seletectedCity=this.cityName;
 				location.reload();
 				
 				
 				
 						
 			},
 			error =>  {
 				console.log(error);
 			}
		);	
	
    //$event.preventDefault();
  
  };
  
  public changePassword(){
  	
  	this.changepassword=!this.changepassword;
  	this.showLoginModal = !this.showLoginModal;
  }
  public passwordResetdiss(){
  	this.changepassword=!this.changepassword;
  }
  
  public resetPassword(){
  	this.resetpassword=!this.resetpassword;
  	this.showLoginModal = !this.showLoginModal;
  	
  }
  ResetPassdiss(){
  	
  	this.resetpassword=!this.resetpassword;
  }
  
  
 public  resendOtp(){
 // alert("resend");
  	this.userService.resendOtp(this.registerForm)
		.subscribe(
			response  => {
			
			//alert(response);
				
			},
			error =>  {
			
			  
				console.log(error);
			}
		)
  }
  
  
  
  
  
  
  
  backButton(){
  	this.showLoginModal = !this.showLoginModal;
  	this.resetpassword=!this.resetpassword;
  	
  }
  backButtonForForgot(){
  	this.showLoginModal = !this.showLoginModal;
  	this.changepassword=!this.changepassword;
  	
  }
  
 forgotPassword(){
 	
 	
 	
 	if(this.emailValid!=""){
 	this.emailmessage="";
 	this.pleaseRegis="";
 	
 	if (this.emailValid.length==10){
 		this.userService.forgotPassword(this.emailValid)
		.subscribe(
			response  => {
			  			if(response.status==true){
			  				
			  				 this.changepassword=!this.changepassword;
			  			}
			  			else{
			  			    this.emailnotvalid="";
			  				this.pleaseRegis1="Please register!!";
			  			}
			},
			error =>  {;
				console.log(error);
			}
		);		
	
 		
 	}else{
 	this.pleaseRegis1="";
 		this.emailnotvalid="Please enter 10 digit's mobile number!!!"
 	}
 		
 	}else{
 		this.emailmessage="Please enter email or mobile number";
 		this.emailnotvalid="";
 		this.pleaseRegis1="";
 	}
 }
//------------------------------------------------
changePasswordUser(){
	
////alert(this.changeuserPassword.newPassword.length);
  this.oldPasswords="";
  if(this.changeuserPassword.oldPassword==""){
  this.oldPasswords="please enter oldPassword!!!";
  	
  }else if(this.changeuserPassword.newPassword==""){
  this.oldPasswords="please enter newPassword!!!";
  	
  }
  else if(this.changeuserPassword.email==""){
  this.oldPasswords="please enter email!!!";
  	
  }else if(this.changeuserPassword.newPassword.length<7){
  	this.oldPasswords="Your new Password should be atleast 7 character minmum!!! "
  }
  else {
 if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z])+\.([A-Za-z]{2,4})$/.test(this.changeuserPassword.email)){
 	
 	
 	this.userService.changePassword(this.changeuserPassword)
		.subscribe(
			response  => {
			  			if(response.status==true){
			  				
			  				 this.resetpassword=!this.resetpassword;
			  			}
			  			else{
			  				this.oldPasswords="Your not register!!";
			  			}
			},
			error =>  {;
				console.log(error);
			}
		);	
 	  
 }else {
 	this.oldPasswords="Email you have entered is not valid!!! Eg: welcome@gmail.com";
 }
  	
  }

}
//-------------------------------------------------
}