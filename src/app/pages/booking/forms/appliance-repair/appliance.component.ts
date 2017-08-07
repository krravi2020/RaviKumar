import { Component,ViewChild, OnInit, trigger, transition, style, animate  } from '@angular/core';
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
import { ApplianceService } from '../../../../services/appliance/appliance.service';

import { ApplianceRepairRequest } from '../../../../models/appliance/ApplianceRepair';

/**
 * Component for Appliance Repair Service addition Form
 * @param {'./forms/appliance.html'}}
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
 	templateUrl: './appliance.html',
 	styleUrls: [ '../../style.css' ],
 	providers: [ApplianceService,OrderService,MainNavComponent],
 	animations: animations
 })
 export class ApplianceRepairBooking extends BookingComponent {
 	@ViewChild('navbar') navbar : any;
 	public requestForm : FormGroup;

 	public expertise: string;
 	public expertiselink: string;
 	public city: any;
 	public user: any;
 	public order_details: any;
 	public applianceType: any;
 	public applianceWork: any;
 	public applianceFeatType: any;
 	public applianceCapacity: any;
 	public cost: any;
 	public expid: any;
 	public today:string=new Date().toJSON().split('T')[0];
    public times:string[]=[];
 	public cityHide:boolean=true;
 	public vendors: any;
 	public notificationForBooking=false;
 	public vendorAvilable:boolean =true;
 	public citynotSclect:boolean=false;
 	public localities: Locality[];
 	public zone: string;
 	public description :string;
 	public vendostatus:any;
 	public vendorhide:boolean=false;
 	public time:string;
 	public date:string;
 	
 	public address:any={};
public vendornotSclect:boolean=false;
public localityNotAvil:boolean=false;
public vendornotAvil:boolean=false;


 	appliances: string[];
 	brands: string[];
 	capacities: string[];
 	types: string[];
 	works: string[];
 	public l:number=0;

 	constructor(private appService: ApplianceService, public titleService:Title,private localityService:LocalityService, 
 		public fb: FormBuilder , private bookingService:BookingService,private orderService:OrderService,
 		private userService: UserService, private _sanitizer: DomSanitizer) {
 		super(titleService,'Service Sathi - Appliance Repair Booking',6);
 		this.stageStates[0] = true;
 		this.expertise = 'Appliance Repair';
 		this.expertiselink = 'appliance';
 		
 		
 		
 		//Set Initial stage state to true to allow moving foward
 		//First stage is only text intro
 		//Setup Nested Form Group
 		this.requestForm = this.fb.group({
 			'jobs': this.fb.group({
 				appliance_name : [false, Validators.required ],
 				appliance_brand : [false, Validators.required ],
 				appliance_type : [false, Validators.required ],
 				appliance_capacity : [false, Validators.required ],
 				appliance_work : [false, Validators.required ],
 				desc: ['',Validators.nullValidator],
 				cost: ['',Validators.nullValidator],
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
			}
 		
 		//------------------------
 		
 		if(localStorage.getItem('cityID')!=null){
			this.citynotSclect=false;
			this.cityHide=true;
			this.localityService.getCityName(localStorage.getItem('cityID')).subscribe(
 			
 			cityname => {
 			
 				this.city = cityname;			
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
 		this.user = this.userService.getLocalUser();
 		this.localities = [];
 		this.time="";
 		this.date="";
 		this.cost = 'On Visit';
 		//this.expid = '5884e5a9ccadb341068ef277';
 		this.localityService.getLocalitiesByCity(localStorage.getItem('cityID')).subscribe(
 			
 			localities => {
 			
 				this.localities = localities;
 				//alert("automobile-->> "+JSON.stringify(this.localities));
 				
 			},
 			error =>  {
 				this.handleError(error)
 			}
		);	
			       this.vendors=[];
			       
	    this.localityService.serviceDiscription("Appliance Repair").subscribe(
       
       descriptions => {
 			
 				this.description = descriptions;
 			//alert("automobile-->>description "+JSON.stringify(this.description));
 				
 			},
 			error =>  {
 				this.handleError(error)
 			}
 			);	
	     	       

 		this.appliances = this.appService.getAppliances();
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
 	onSelect(applianceType: string) {
 		this.brands = this.appService.getApplianceBrands(applianceType);
 		this.capacities = this.appService.getApplianceCapacity(applianceType);
 		this.types = this.appService.getApplianceType(applianceType);
 		this.works = this.appService.getApplianceWork(applianceType);
 		this.applianceType = applianceType;
 		this.onSelectCost();
 	}
 	onWorkSelect(applianceWork: string) {
 		this.applianceWork = applianceWork;
 		this.onSelectCost();
 	}
 	onTypeSelect(applianceFeatType: string) {
 		this.applianceFeatType = applianceFeatType;
 		this.onSelectCost();
 	}
 	onCapacitySelect(applianceCapacity: string) {
 		this.applianceCapacity = applianceCapacity;
 		this.onSelectCost();
 	}
    vendorSelectHandler = (vendor:any)=> {
            ////alert("from autocomponent 10"+JSON.stringify(vendor));
            //	this.zone = locality.zone;
        };
 	
 	formChanged( data : any ) : void {
 	 
 		let controls : any  = this.requestForm.controls;
 		switch(this.stage){
 			case 2 : 
 			if(!this.fillJobForm(data.jobs)){
 				this.stageStates[this.stage-1] = false;
 				return;
 			}
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
 			// this.stageStates[this.stage-1] = true;
 			case 6 : 
 			if(controls.payment.valid){
 				this.stageStates[this.stage-1] = true;
 			}else{
 				this.stageStates[this.stage-1] = false;
 			}
 			break;
 			case 7 : 
 			// this.stageStates[this.stage-1] = true;
 			break;
 			default : 
 			this.stageStates[this.stage-1] = true;
 			break;
 		}
 	}

 	fillJobForm(jobs:any) : boolean {
 		let count = 0;
 		if(jobs.appliance_name && jobs.appliance_brand && jobs.appliance_type && jobs.appliance_work 
 			&& jobs.appliance_capacity){
 			count++;
 		}

 		return (count > 0) ? true : false;
 	}


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
 	
 	
 /*	checkout() : void{
 		console.log(this.requestForm.value);
 		this.orderService.setOrderLocalUser(this.requestForm.value);
 		this.order_details = this.orderService.getOrderLocalUser();
 		this.user = this.userService.getLocalUser();
 		if(!this.user){
 			this.navbar.loginModal();
 		}else{
 			this.next();
 		}
 	}
 	*/
 	citymodelDissmis() : void{
 		this.citynotSclect=false;
 		
 	}
    Dissmis():void{
    	this.notificationForBooking=false;
    	
    }
 	
 	pay(){
 		this.next();
 	}

 	book() : void{
 		
       
        var bookingData = this.requestForm.value;
        bookingData.cost = this.cost;
        bookingData.serviceName ='Appliance Repair';
       // bookingData.address.zone = bookingData.address.locality.zone;
        bookingData.address.locality = bookingData.address.locality;
       //  alert("address-->> "+JSON.stringify(this.requestForm.address));
        this.bookingService.bookingSubmit(this.user.id,this.user.name, this.requestForm.value)
             .subscribe(
 			response  => {
 			/* if(this.requestForm.value.payment.payment=="payadvance"){
 			    this.notificationForBooking=true;
 			    }*/
 			    this.notificationForBooking=true;
 				this.next();
 				
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
 	onSelectCost(){
 		switch (this.applianceType) {
 			case "Washing Machine":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 400; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 400; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;
 				
 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;
 			case "Refrigerator":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 400; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 350; 
 				break;
 				case "Gas Refill":
 				this.cost= 1750; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Microwaves":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 'On Visit'; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 'On Visit'; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Chimney":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 'On Visit'; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 'On Visit'; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Fans":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 'On Visit'; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 'On Visit'; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Geyser":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 350; 
 				break;
 				case "Repair":
 				this.cost= 350; 
 				break;
 				case "Servicing":
 				this.cost= 'On Visit'; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Water Purifier":
 			switch (this.applianceWork) {
 				case "Install":
 				this.cost= 'On Visit'; 
 				this.cost= 400; 
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 350; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Television":
 			switch (this.applianceWork) {
 				case "Install":
 				switch (this.applianceCapacity) {
 					case "10 - 20 inch":
 					this.cost= 450; 
 					break;
 					case "20-30 inch":
 					this.cost= 450; 
 					break;
 					case "30-40 inch":
 					this.cost= 550; 
 					break;
 					case "40 & above":
 					this.cost= 700; 
 					break;
 				}
 				break;
 				case "Repair":
 				this.cost= 'On Visit'; 
 				break;
 				case "Servicing":
 				this.cost= 400; 
 				break;
 				case "Others":
 				this.cost= 'On Visit'; 
 				break;

 				default:
 				this.cost= 'Please Select Work'; 
 				break;
 			}
 			break;

 			case "Air Conditioner":
 			switch (this.applianceFeatType) {
 				case "Split AC":
 				switch (this.applianceWork) {
 					case "Install":
 					this.cost= 1500; 
 					break;
 					case "Uninstallation":
 					this.cost= 800; 
 					break;
 					case "Repair":
 					this.cost= 'On Visit'; 
 					break;
 					case "Servicing":
 					this.cost= 750; 
 					break;
 					case "Gas Refill":
 					this.cost= 1500; 
 					break;
 					case "New Socket Fixing":
 					this.cost= 'On Visit'; 
 					break;
 					case "Others":
 					this.cost= 'On Visit'; 
 					break;
 					default:
 					this.cost= 'Please Select Work'; 
 					break;
 				}
 				case "Window AC":
 				switch (this.applianceWork) {
 					case "Install":
 					this.cost= 800; 
 					break;
 					case "Uninstallation":
 					this.cost= 500; 
 					break;
 					case "Repair":
 					this.cost= 'On Visit'; 
 					break;
 					case "Servicing":
 					this.cost= 500; 
 					break;
 					case "Gas Refill":
 					this.cost= 1500; 
 					break;
 					case "New Socket Fixing":
 					this.cost= 'On Visit'; 
 					break;
 					case "Others":
 					this.cost= 'On Visit'; 
 					break;
 					default:
 					this.cost= 'Please Select Work'; 
 					break;
 				}


 			}
 			break;


 		}
 	}
 	
 	
 	

 	autocompleListFormatter = (data: any) : SafeHtml => {
		let html = `<span>${data.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}

  autocompleListFormatterVendor=(data: any) : SafeHtml => {
 	
		let html = `<span>${data.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}
	localitySelectHandler = function(locality:Locality){
	
	
		//this.zone = locality.zone;
		
          localStorage.setItem("getVendor", JSON.stringify({'locality':locality,"serviceName":"Appliance Repair"}));
	
	this.forVendorStatus();
	};
	
	
	public forVendorStatus(){
		
		
		 this.localityService.vendoStatus(localStorage.getItem("getVendor"))
           .subscribe(
 			response  => {
 				this.vendostatus=response;
 				
 				if(this.vendostatus.status==true){
 					
 					
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


	
	onSclectTime=($event:any)=> {
    
    
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
              //  alert("automobile vendor -->> "+JSON.stringify(response));
                this.vendors = response;
            }, function (error) { this.handleError(error); });
            	
            }
        };
 }
