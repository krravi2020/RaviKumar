
import { Title } from '@angular/platform-browser';
import { BookingService } from '../../../services/booking/booking.service';
import { UserService } from '../../../services/user/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit, trigger, transition, style, animate  } from '@angular/core';


import { SideMenuComponent } from '../../../components/navigation/side-menu/side-menu.component';

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	moduleId: module.id,
	selector: 'ss-page-dashboard',
	templateUrl: './BookHistory.html',
	styleUrls: [ '../style.css' ],
})
export class BookHistory{

    @ViewChild('navbar') navbar : any;
 	public requestForm : FormGroup;
 	
	public link :string;
  public someProperty = false;
  public anotherProperty = false;
  public showStyle: boolean=false;
  public showStyle1:boolean=false;
  public invoicebill:any;
  public payAftr:boolean=false;
  public myClass :number;
  public estmatedCost:boolean=false;
  public payText:string="";
  public myClass1 :number;
  public vendorName:any;
  public vendorName1:any;
  public adminNotVendr:boolean=false;
  public formForDiv2:boolean=true;
  public surl:any;
  public furl:any;
  public vendorNotraisebill:boolean=false;
  public vendorNotAccepted:boolean=false;
  public automobile_type:string;
  public automobile_work:string;
  public timeslot:string;
  public daTe:string;
  public house:string;
  public registerd:boolean=false;
  public landmark:string;
  public locality:string;
  public cost:string="";
  public payInadv:boolean=false;
  public payAfterCancle:boolean=false;
  
  public action:any;
  public MERCHANT_KEY:any;
  public hash_string:any;
  public hashh:any;
  public posted:any;
  public txnid:any;
  public formForDiv:boolean=false;
  public name:string;
  
  public showOngoing:boolean=true;
  public showHistory:boolean=false;
  public usersOngiong:any;
  public inputPayu:any;
  public usersHistory:any;
  public bookingStatus:any;
  public serviceName:string;
  public user: any;
  public paymentNotification: boolean=false;
  //public bookingStatus:any[];
  	public bookingStatusLength:number;
  public histLength:number=0;
  	
  	public bokingstatus:boolean=false;
  	public histroys:boolean=false;

  
  
	constructor(public fb: FormBuilder ,private titleService: Title,private userService: UserService,private _sanitizer: DomSanitizer,private bookingService:BookingService) { 
	this.myClass=0;
	this.myClass1=0;
	this.showStyle1=false;
	this.invoicebill={services:[]};
	this.showStyle=false;
	this.showOngoing=true;
	this.bookingStatus=[];
	this.inputPayu={
		amount:0,
		firstname:"",
		phone:"",
		productinfo:"",
		email:""
		
	};
	this.bookingStatusLength=this.bookingStatus.length;
	this.user = this.userService.getLocalUser();
	this.showHistory=false;
	this.usersOngiong=[];
	this.usersHistory=[];
	}

	ngOnInit(): void {
	
	this.requestForm =this.fb.group({
		
		'payment': this.fb.group({
 				payment: ['payadvance',Validators.required],
 			})
 			,
 			'paymentCash': this.fb.group({
 				paymentCash: ['payadvance',Validators.required],
 			})
	});
		
	this.bookingService.getHistory(this.user.id).subscribe(response  => {
				
				// this.bokingstatus=false;
				    this.bookingStatus= response;
			        this.bookingStatusLength=this.bookingStatus.length;
			        this.histLength=this.bookingStatusLength;
			         if(this.bookingStatus.length==0){
			        	//this.bokingstatus=true;
			        	//this.histroys=true;
			        }
			        this.usersHistory=response;
				
			},
			error =>  {
				console.log(error);
			});
	
	this.bookingService.getBookings(this.user.id).subscribe(response  => {
				
				
				 //this.histroys=false;
				    this.bookingStatus= response;
				    
				    //alert(JSON.stringify(this.bookingStatus));
			        this.bookingStatusLength=this.bookingStatus.length;
			        if(this.bookingStatus.length==0){
			       
			        	this.bokingstatus=true;
			        }
			        this.usersOngiong=response;
			       
				
			},
			error =>  {
				console.log(error);
			});
	}
	
	
	
	setClasses() {

	this.histroys=false;
	this.bokingstatus=false;
	if(this.bookingStatus.length==0){
			      
	this.bokingstatus=true;
	 }
	 
	this.myClass1=1;

   if(this.showStyle1==true){
      if(this.myClass1!=0){
      this.showStyle1=!this.showStyle1;
      this.showStyle=!this.showStyle;
      this.showOngoing=true;
      this.showHistory=false;
      }
      }

	
    }
    
    
    setDiffClasses() {
    
    this.histroys=false;
	this.bokingstatus=false;
	if(this.histLength==0){
			       
	this.histroys=true;
	 }
	 
     this.myClass=1;
      
      this.showStyle=!this.showStyle;
      
      if(this.showStyle==true){
      if(this.myClass1==0){
      this.showStyle1=!this.showStyle1;
      this.showOngoing=false;
      this.showHistory=true;
      }else{
      this.showStyle1=!this.showStyle1;
      this.showOngoing=false;
      this.showHistory=true;
      }
      }else { 
      this.showStyle=!this.showStyle;
      }
      
	
    }
    
    
    
    public Notifications=(data:any)=>{
  
  localStorage.setItem("userID", data.id);
    if(data.RequestType=="new"){
        
    	this.vendorNotAccepted=true;
    }else{
    
   // alert("adv notif");
     this.payInadv=true;
    this.vendorNotAccepted=false;
    data=JSON.stringify(data);
    localStorage.setItem("paydata", data);
    
    
    }
    
   

}


 public Notifications1=(data:any)=>{
  
  localStorage.setItem("userID", data.id);
    if(data.RequestType=="new"){
        
    	this.vendorNotAccepted=true;
    	 this.payAfterCancle=false;
    }else{
    
   // alert("adv notif");
     this.payInadv=false;
     this.payAfterCancle=true;
    this.vendorNotAccepted=false;
    data=JSON.stringify(data);
    localStorage.setItem("paydata", data);
    
    
    }
    
   

}


public payAfterCancleDismis(){

this.payAfterCancle=false;
	
}


public FinalpayDiss(){

//alert(JSON.stringify(this.requestForm.value));
//{"payment":{"payment":"paylater"},"paymentCash":{"paymentCash":"payonline"}}

//{"payment":{"payment":"paylater"},"paymentCash":{"paymentCash":"paybycash"}} 



    if(this.requestForm.value.payment.payment=="payadvance" || this.requestForm.value.paymentCash.paymentCash== "payonline"){
    	//alert("hiiii-->>");
    	this.payAfterCancle=false;
    	if(this.requestForm.value.paymentCash.paymentCash== "payonline"){
    		this.requestForm.value.paymentCash.paymentCash="";
    	}
    	this.payInadv=false;
	 let  data=localStorage.getItem("paydata");
    let data1=JSON.parse(data);
    this.payAftr=false;
    
    if(data1.id){
    this.bookingService.invoicebill(data1.id).subscribe(response  => {
				
				
				 
				    this.invoicebill= response;
				    
				    //alert(JSON.stringify(this.invoicebill));
				    if(this.invoicebill.services!=undefined || this.invoicebill.services!=null){
				    
				    /*for(var i=0;i<this.invoicebill.services.length;i++){
				    	if(this.invoicebill.services[i].name==data1.ServiceType){
				    		this.cost=this.invoicebill.services[i].cost;
				    		break;
				    	}
				    }*/
				    
				    
				    this.cost=this.invoicebill.cost;
				    }
				    
				   
				    
				   if(this.cost==""){
				   	 
				   	 this.vendorNotraisebill=true;
				   }else{
			        this.serviceName=data1.ServiceType;
    this.automobile_type=data1.automobile_type;
  	this.automobile_work=data1.automobile_work;
  	this.timeslot=data1.time;
  	this.daTe=data1.date;
  	this.house=data1.house;
  	this.landmark=data1.landmark;
  	this.locality=data1.locality;
  	
	localStorage.setItem("userID", data1.id);
	this.estmatedCost=!this.estmatedCost;
	//this.paymentNotification= !this.paymentNotification;
	}
				
			},
			error =>  {
				console.log(error);
			});
			
    
   };
    
   
    }else{
    
     //  alert(this.requestForm.value.payment.payment);
       //alert(localStorage.getItem("userID"));
       this.payAftr=true;
       this.payInadv=false;
       
       if(this.requestForm.value.paymentCash.paymentCash== "paybycash"){
        this.payAftr=false;
      // alert("pay by cash");
      
      
      
      let  data=localStorage.getItem("paydata");
    let data1=JSON.parse(data);
    this.payAftr=false;
    
    if(data1.id){
    this.bookingService.invoicebill(data1.id).subscribe(response  => {
				
				
				 
				    this.invoicebill= response;
				    
				    //alert(JSON.stringify(this.invoicebill));
				    if(this.invoicebill.services!=undefined || this.invoicebill.services!=null){
				    
				    /*for(var i=0;i<this.invoicebill.services.length;i++){
				    	if(this.invoicebill.services[i].name==data1.ServiceType){
				    		this.cost=this.invoicebill.services[i].cost;
				    		break;
				    	}
				    }*/
				    
				    
				    this.cost=this.invoicebill.cost;
				    }
				    
				   
				    
				   if(this.cost==""){
				   	 
				   	 this.vendorNotraisebill=true;
				   }else{
			   
			   
			   
			   
			   this.bookingService.addPaymetType(localStorage.getItem("userID")).subscribe(response  => {
				// alert(JSON.stringify(response));
				
				     if(response.status==true){
				    
				    this.vendorName= response;
				    
				     this.vendorName1= this.vendorName;
				     this.name=this.vendorName1.name
				    // alert();
				     
			        this.payInadv=false;
    	            this.registerd=true;
    	            location.reload();
				    }
				    else{
				    	if(response.data.vendor){
				    		
				    		 this.payInadv=false;
				    		this.adminNotVendr=true;
				    	}
				    }
				    
				   
			        //this.bookingStatusLength=this.bookingStatus.length;
			        
				
			},
			error =>  {
				console.log(error);
			});
			   
			   
	}
				
			},
			error =>  {
				console.log(error);
			});
			
    
   };
   
      
      
       
			};
       
    	
    }

	
  
	
}

vendorNotraisebillDiss(){
	 this.vendorNotraisebill=false;
}

adminNotVendrAs(){
  this.adminNotVendr=false;	
  this.payInadv=false;
	
}


public payAftrDismis(){

this.payAftr=false;
	
}


Regsterd(){
	this.registerd=!this.registerd;
}
public FinalpayDismis(){
	this.payInadv=false;
	
}
public vendorNotDiss(){
	this.vendorNotAccepted=false;
}

public estmatedCosts(){
	this.estmatedCost=!this.estmatedCost;
	
	
}


payinAdvance(){


this.estmatedCost=!this.estmatedCost;
this.inputPayu.amount=this.cost;
this.paymentNotification= !this.paymentNotification;
	
}

public notificationdismiss(){
this.paymentNotification= !this.paymentNotification;

}


public FinalPayment()

{
	
}
public cancel=($event:any)=>{

//alert("id-->> "+$event.target.id)
	this.bookingService.cancel($event.target.id).subscribe(response  => {
							
				 if(response.status==true){
				    location.reload();
				 }			
			},
			error =>  {
				console.log(error);
			});
}

public payUaccept(){

this.inputPayu.amount=this.cost;

if(this.inputPayu.amount==0 ||this.inputPayu.amount==0.0){

this.payText="Please enter amout!!!";
	
}
else if(this.inputPayu.inputFirstName==""){
this.payText="Please enter FirstName!!!";
	
}
else if(this.inputPayu.phone==""){
this.payText="Please enter MobileNumber!!!";
	
}
else if(this.inputPayu.inputProductInfo==""){
this.payText="Please enter Please enter productInfo!!!";
	
}
else if(this.inputPayu.email==""){
this.payText="Please enter email!!!";
	
}
else{
	this.payText="";


	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.inputPayu.email)){
           
		
		 this.inputPayu.userid=localStorage.getItem("userID");
	this.bookingService.payUdetails(this.inputPayu).subscribe(response  => {
				
				
				         this.furl=response.posted.furl;
				         this.surl=response.posted.surl;
				        
						 this.action=response.action;
  						 this.MERCHANT_KEY=response.MERCHANT_KEY;
  						
  						 this.hash_string=response.hash_string;
  						 this.hashh=response.hashh;
  						 this.posted=response.posted;
  						 this.txnid=response.txnid;
  						 this.formForDiv=true;
  						 this.formForDiv2=false;
  						
  						
			},
			error =>  {
				console.log(error);
			});
		
		       
       } else{
       	this.payText="Invalid email";
       	  
       }

}			
}

	
}