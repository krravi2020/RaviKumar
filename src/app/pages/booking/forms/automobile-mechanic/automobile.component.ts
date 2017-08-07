import { Component, ViewChild, OnInit, trigger, transition, style, animate  } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BookingComponent } from '../../booking.component';
import { MainNavComponent } from '../../../../components/navigation/main-nav/main.nav.component';

import { ApiResponse } from '../../../../models/ApiResponse';
import { Locality } from '../../../../models/locality';
import { LocalityService } from '../../../../services/locality/locality.service';

import { BookingService } from '../../../../services/booking/booking.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { AutomobileType } from '../../../../services/automobile/type.service';

import { AutomobileRepairRequest } from '../../../../models/automobile/AutomobileRepair';

/**
 * Component for Automobile Repair Service addition Form
 * @param {'./forms/automobile.html'}}
 */
 let animations = [trigger(
 	'enterAnimation', [
 	transition(':enter', [
 		style({ opacity: 0}),
 		animate('500ms', style({opacity: 1}))
 		]),
 	transition(':leave', [
 		style({ opacity: 1}),
 		animate('150ms', style({opacity: 0}))
 		])
 	]
 	)];

 @Component({
 	moduleId: module.id,
 	selector: 'ss-form-arb',
 	inputs: ['nav'],
 	templateUrl: './automobile.html',
 	styleUrls: [ '../../style.css' ],
 	providers: [AutomobileType,OrderService,MainNavComponent],
 	animations: animations
 })
 export class AutomobileMechanicBooking extends BookingComponent {

 	@ViewChild('navbar') navbar : any;
 	public requestForm : FormGroup;
 	public expertise: string;
 	public expertiselink: string;
 	public city: any;
 	public vendorAvilable:boolean =true;
 	public user: any;
 	public hideType: boolean;
 	public order_details: any;
 	public automobileType: any;
 	public automobileWork: any;
 	public localityNotAvil:boolean=false;
 	public automobileModel: any;
 	public localities: Locality[];
 	public vendostatus:any;
 	public vendornotAvil:boolean=false;
 	public zone: string;
 	public cost: any;
 	public citynotSclect:boolean=false;
 	public cityHide:boolean=true;
 	public expid: any;
 	public notificationForBooking=false;
 	public vendors: any;
 	public description:string="";
 	public vendorhide:boolean=false;
 	public date:string="";
 	public time:string="";
 	public today:string=new Date().toJSON().split('T')[0];
    public times:string[]=[];
    public vendornotSclect:boolean=false;
 	automobiles: string[];
 	types: string[];
 	brands: string[];
 	models: string[];
 	works: string[];
 	public l:number=0;
 	public k:number=0;
 	public address:any={};

 	constructor(private autoService: AutomobileType, public titleService:Title, 
 		public fb: FormBuilder , private bookingService:BookingService,
 		private orderService:OrderService, private userService: UserService,
 		private localityService:LocalityService, private _sanitizer: DomSanitizer) {
 		super(titleService,'Service Sathi - Automobile Repair Booking',6);
 		this.stageStates[0] = true;
 		this.expertise = 'Automobile Repair';
 		this.expertiselink = 'automobile';
 		
 		
 		
 		//alert(this.times);
 		 
 		this.user = this.userService.getLocalUser();
 		this.localities = [];
 		this.vendors=[];
 		this.localityService.serviceDiscription("Automobile mechanics").subscribe(
      // this.city = localStorage.getItem("city");
       descriptions => {
 			
 				this.description = descriptions;
 		
 				
 			},
 			error =>  {
 				this.handleError(error)
 			}
 			);	
 		this.types = this.autoService.getAutomobileType();
 		this.cost = 150;
 		//this.expid = '58d854ccaddef54d2e6c0a3a';
 		//alert(localStorage.getItem('cityID'));
 		this.localityService.getLocalitiesByCity(localStorage.getItem('cityID')).subscribe(
 			
 			localities => {
 			
 				this.localities = localities;
 				//this.city = localStorage.getItem('city');
 				//alert("automobile-->> "+JSON.stringify(this.localities));
 				
 			},
 			error =>  {
 				this.handleError(error)
 			}
		);	
		
		if(JSON.parse(localStorage.getItem('ss-user'))){
			if(JSON.parse(localStorage.getItem('ss-user')).id){
			this.localityService.getAddress(JSON.parse(localStorage.getItem('ss-user')).id).subscribe(
 			
 			response => {
 			
 			  if(response){
 			 
 				this.address = response;
 			}
 			else{
 			
 			this.address="";
 			};
 				
 				
 				
 			},
 			error =>  {
 				this.handleError(error)
 			}
		);	
			};
			};
			
			//------------------------
			if(localStorage.getItem('cityID')!=null){
			this.citynotSclect=false;
			this.cityHide=true;
			this.localityService.getCityName(localStorage.getItem('cityID')).subscribe(
 			
 			cityname => {
 			
 				this.city = cityname;	
 				localStorage.setItem('localcity',this.city);
 						
 			},
 			error =>  {
 				this.handleError(error)
 			}
		);	
		}else{
			this.citynotSclect=true;
			this.cityHide=false;
		}
			//------------------------    
			
			
			
			this.requestForm = this.fb.group({
 			'jobs': this.fb.group({
 				automobile_type : [false, Validators.required ],
 				automobile_brand : [false, Validators.required ],
 				automobile_model : [false, Validators.required ],
 				automobile_work : [false, Validators.required ],
 				desc: ['',Validators.nullValidator],
 			}), 			
 			'address': this.fb.group({
 				house: ['',Validators.required],
 				landmark: ['',Validators.required],
 				locality: ['',Validators.required]
 			}),
 			'appointment': this.fb.group({
 				date: ['',Validators.required],
 				timeslot: ['',Validators.required],
 				vendordisp: ['',Validators]
 			}),
 			'checkout': this.fb.group({
 			}),
 			/*'payment': this.fb.group({
 				payment: ['payadvance',Validators.required],
 			}),*/
 			'complete': this.fb.group({
 			}),
 		});
 		this.requestForm.valueChanges.subscribe(data => this.formChanged(data));   
 		
 	}
 	
 	onSelect(automobileType: string) {
 		console.log(automobileType);
 		if(automobileType === 'Four Wheelers'){
 			this.hideType = true;
 			this.brands = this.autoService.getAutomobileBrands(automobileType);
 			this.works = this.autoService.getAutomobileWork(automobileType);
 		}else{
 			this.hideType = false;
 			this.works = this.autoService.getAutomobileWork(automobileType);
 		}
 	}

 	onBrandSelect(automobileBrand: string) {
 		this.models = this.autoService.getAutomobileModel(automobileBrand);
 	}

 	
 	formChanged( data : any ) : void {
 	
 		let controls : any  = this.requestForm.controls;
 		switch(this.stage){
 			case 2 : 
 			if(!this.fillJobForm(data.jobs)){
 			
 			
 				this.stageStates[this.stage-1] = false;
 				return;
 			}
 			//alert("fillJobForm--"+this.fillJobForm(data.jobs));
 			this.stageStates[this.stage-1] = true;
 			break;
 			case 3 : 
 			if(controls.address.valid){
 			
 				this.stageStates[this.stage-1] = true;
 			}else{
 			
 				this.stageStates[this.stage-1] = false;
 			}
 			break;
 			case 4 : 
 			if(controls.appointment.valid){
 			
 				this.stageStates[this.stage-1] = true;
 			}else{
 			
 				this.stageStates[this.stage-1] = false;
 			}
 			break;
 			case 5 :
 		
 			this.stageStates[this.stage-1] = true;
              
 			/*case 6 : 
 			if(controls.payment.valid){
 				this.stageStates[this.stage-1] = true;
 			}else{
 				this.stageStates[this.stage-1] = false;
 			}*/
 			break;
 			/*case 6 : 
 			 this.stageStates[this.stage-1] = true;
 			break;*/
 			default : 
 			this.stageStates[this.stage-1] = true;
 			break;
 		}
 	}

 	fillJobForm(jobs:any) : boolean {
 		let count = 0;
 		if(jobs.automobile_type && jobs.automobile_work){
 		
 			count++;
 		}
 		
 		

 		return (count > 0) ? true : false;
 	}


vedordissp() :void{
	
	this.vendornotSclect=false;
}

nextValidation():void{
	
	if(this.localities.indexOf(this.requestForm.value.address.locality)>-1){
		this.next();
	}else{
		this.localityNotAvil=true;
	}
	
}

localityDissmis(){
	this.localityNotAvil=false;
};
 	checkout() : void{
 	
 //	alert(this.requestForm.value.appointment.vendordisp);
 //	alert(this.vendors.indexOf(this.requestForm.value.appointment.vendordisp));
 		this.orderService.setOrderLocalUser(this.requestForm.value);
 		this.order_details = this.orderService.getOrderLocalUser();
 		this.user = this.userService.getLocalUser();
 		//alert(this.vendorAvilable);
 		
 		if(!this.user){
 			this.navbar.loginModal();
 		}else{
 		
 		if(this.vendorAvilable==false){
 		//alert("--->> ");
 			this.next();
 			this.requestForm.value.appointment.vendordisp="noVendorAvil"
 		}
 		
 		
 		else if(this.vendorAvilable==true){
 			//alert("true-->>");
 			//alert(this.requestForm.value.appointment.vendordisp);
 			
 			
 			if(this.vendors.indexOf(this.requestForm.value.appointment.vendordisp)>-1){
 			if(this.requestForm.value.appointment.vendordisp){
 				this.next();
 			}
 			else{
 			//alert("true hj-->>");
 			this.vendornotSclect=true;
 			this.vendorhide=true;
 			}
 			}else{
 		//	alert("after else");
 				//this.vendornotSclect=true;
 			//this.vendorhide=true;
 			this.vendornotAvil=true;
 			}
 			
 		}else{
 			this.next();
 			}
 		}
 	}
 	
 	vedorNotavil(){
 		this.vendornotAvil=false;
 	}
 	
 	pay(){
 		this.next();
 	}
 	
 	citymodelDissmis() : void{
 		this.citynotSclect=false;
 		
 	}
    Dissmis():void{
    	this.notificationForBooking=false;
    	
    }
 	book() : void{
 		
        
       
        var bookingData = this.requestForm.value;
        bookingData.cost = this.cost;
        bookingData.serviceName ='Automobile mechanics';
       // bookingData.address.zone = bookingData.address.locality.zone;
        bookingData.address.locality = bookingData.address.locality;
       // this.requestForm.value.payment={};
       // this.requestForm.value.payment.payment="payadvance";
         //alert("address-->> "+JSON.stringify(this.requestForm.address));
		//if(this.requestForm.value.payment.payment=='payadvance'){
			
			//this.checkoutForNotificaton=true;
		//}//
		//alert("user id "+this.user.id);
        this.bookingService.bookingSubmit(this.user.id,this.user.name, this.requestForm.value)
           .subscribe(
 			response  => {
 			
 			
 			   // if(this.requestForm.value.payment.payment=="payadvance"){
 			    //this.notificationForBooking=true;
 			    //}
 				this.next();
 				this.notificationForBooking=true;
 				
 			},
 			error =>  this.handleError(error)
 			);

 	}
 	handleResponse(response:any) : void {
 		console.log(response);
 	}

 	handleError(error:any) : void {
 		console.log(error);
 	}

 	autocompleListFormatter = (data: any) : SafeHtml => {
		let html = `<span  >${data.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}

  autocompleListFormatterVendor=(data: any) : SafeHtml => {
 	
		let html = `<span>${data.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}
	localitySelectHandler = function(locality:Locality){
	
	//alert(JSON.stringify(locality));
	
	          localStorage.setItem("getVendor", JSON.stringify({'locality':locality,"serviceName":"Automobile mechanics"}));

  
  this.forVendorStatus();
        	
		
	};
	
	public forVendorStatus(){
		
		
		 this.localityService.vendoStatus(localStorage.getItem("getVendor"))
           .subscribe(
 			response  => {
 				this.vendostatus=response;
 				
 				if(this.vendostatus.status==true){
 					//alert("true");
 					
 					this.vendorAvilable=true;
 					
 				}else{
 					this.vendorAvilable=false;
 					this.vendorhide=true;
 					 var bookingData = this.requestForm.value;
 					// bookingData.appointment.vendordisp="noVendorAssigened"
 					//alert("--. "+JSON.stringify(bookingData.appointment.vendordisp));
 					
 				}
 				//alert(JSON.stringify(this.vendostatus));
 			
 			  
 				
 			},
 			error =>  this.handleError(error)
 			);
	}

/*
precheck(){
	//alert("precheck()");
	//alert(this.vendorAvilable);
	//this.next();
	
}
	*/
	onSclectTime=($event: any)=> {
      
      
        
         
         if($event.target.id=='date'){
           if($event.target.value==this.today ){
           this.times=[];
           this.l=0;
            
            
            for(var i=0;i<9;i++){
 		if(new Date().getHours()+this.l<=20){
 		   
 		    if(new Date().getHours()+this.l<12){
 		    	this.times.push(new Date().getHours()+this.l+" A.M. to "+(new Date().getHours()+this.l+1)+" A.M.");
 		      
 		    }
 		    else{
 		    	this.times.push(new Date().getHours()+this.l+" P.M. to "+(new Date().getHours()+this.l+1)+" P.M.");
 		       
 		    }
 			
 			}
 		
 		   this.l=this.l+1;
 		}; 
 		}else{
 		   this.times=[];
 		  
 		  
 			for(var i=0;i<12;i++){
 	
 		   
 		        if(i<=3){
 		    	this.times.push(   (8+i)+" A.M. to "+ (9+i) +" A.M.");
 		       }else{
 		       	this.times.push(   (9+i)+" P.M. to "+ (9+i+1) +" P.M.");
 		       }
 		    
 			
 			
 		
 		   //this.k=this.k+1;
 		}
 		}
 		}
            if($event.target.id=='date'){
            
                
            	this.date=$event.target.value;
            }
            else if($event.target.id=='timeslot'){
            	this.time=$event.target.value;
            }
            
            if(this.date!=""&&this.time!=""){
            
           
            var  slotDaT=JSON.parse(localStorage.getItem("getVendor"));
            slotDaT['date']=this.date;
            slotDaT['time']=this.time;
            console.log(slotDaT);
             this.localityService.getvendorList(slotDaT).subscribe(response=> {
            
                this.vendors = response;
            }, function (error) { this.handleError(error); });
            	
            }
        };
 	vendorSelectHandler = function(vendor:any){
	//alert("from autocomponent 10"+JSON.stringify(vendor));
	//	this.zone = locality.zone;
	}
 }
