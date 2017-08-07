import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { UserService } from '../../../services/user/user.service';

@Component({
	moduleId: module.id,
	selector: 'profile',
	templateUrl: './profile.html',
	styleUrls: [ '../style.css' ],
	providers: [UserService]
})
export class ProfileComponent {
	public user: any;
	public num:number=0;
	public userResponse:any;
	public sucessedit:boolean=false;
	public varb:string="";
	public varbL:string="";
	public errors:string="";
	public localities:any[]=[];
	public localityarr:any[]=[];
	public sclectcity:string="";
	public sclectcityL:string="";
	public listCitys:any[]=[];
	public localitiesL:any[]=[];
    public address:string;

	constructor(private titleService: Title,private userService: UserService,private _sanitizer: DomSanitizer) {
		this.titleService.setTitle('Service Sathi - Profile Settings');
		//this.user = this.userService.getLocalUser();
		this.user={
		phone:"",
		email:"",
		name:"",
		
		
		}
	//alert(JSON.parse(localStorage.getItem('ss-user')).id);
		
		
		//console.log(this.user);
	}

	ngOnInit(): void {
	
	this.userService.getUser(JSON.parse(localStorage.getItem('ss-user')).id)
		.subscribe(
			response  => {
			    this.user=response;
			   
			   
			    this.address=this.user.homeaddress;
			    this.varb=this.user.homecity;
			    this.varbL=this.user.homelocality;
			    this.localitiesL=this.user.listOfLocalitys;
			    for(var i=0;i<this.user.listOfCitys.length;i++){
			    
			      this.listCitys.push(this.user.listOfCitys[i].name);
			    	
			    };
			    
			    
			    this.localities=this.listCitys;
			  
			  
			    
			 			  
				}
		);	
	
	}
	
	localitySelectHandler = function(locality:any){
	
	this.user.city=locality;

		
	};
	
	autocompleListFormatter = (data: any) : SafeHtml => {
		let html = `<span>${data.toUpperCase()}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}
	
	sucesseditDissmis():void {
		this.sucessedit=false;
	}

	saveProfile(): void{
	
	if(this.sclectcity){
		this.varb=this.sclectcity;
	}
	if(this.sclectcityL){
		this.varbL=this.sclectcityL;
	}
	if(this.address){
		this.address=this.address;
	}
	
	
	
	   if(this.sclectcity && this.sclectcityL && this.address){
	   this.errors="";	
	   this.user.address=this.address;
	   	this.user.city=this.sclectcity;
	   	this.user.locality=this.sclectcityL;
	   	 delete this.user.cityList;
	   	 
	   	
	    this.userService.editProfile(this.user)
		.subscribe(
			response  => {
			    this.userResponse=response;
			  
			      if(this.userResponse.status==true){
			      // alert("from----->> "+this.userResponse.status);
			       this.sucessedit=true;
			       }

				});
	   	
	   }   
	   else if(this.varb && this.varbL && this.address){
	   this.errors="";	
	   this.user.address=this.address;
	   	this.user.city=this.varb;
	   	this.user.locality=this.varbL;
	   	 delete this.user.cityList;
	   	 
	   	 
	    this.userService.editProfile(this.user)
		.subscribe(
			response  => {
			    this.userResponse=response;
			  
			      if(this.userResponse.status==true){
			      // alert("from----->> "+this.userResponse.status);
			       this.sucessedit=true;
			       }

				}
		);
			
	   }else{
	   
	   if(this.varbL==""){
	   	 this.errors="locality should not be emty!!!";
	   }
	   else{
	 this.errors="Profile details can not be empty!!!";
	   	}
	   }
	   	
	
		
	}
}