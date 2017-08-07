import { Component, OnInit, animate, state, style, transition, trigger,Input } from '@angular/core';
import { Title,BrowserModule }     from '@angular/platform-browser';

import { UserService } from '../../services/user/user.service';

import { MainNavComponent } from '../../components/navigation/main-nav/main.nav.component';

import { ApiResponse } from '../../models/ApiResponse';

@Component({
	moduleId: module.id,
	selector: 'ss-page-home',
	templateUrl: './index.html',
	styleUrls: [ './style.css' ],
})
export class HomeComponent implements OnInit {

public homecity:string="Raipur";

public calculator:any={};
public calOut:string="";
public totalresponse:any;

	constructor(private titleService: Title,private userservice:UserService) { 
	
	this.calculator={
		input1:"",
		input2:"",
		result:0
	}

		this.titleService.setTitle('welcome');
		
		if(localStorage.getItem('cityName')){
			this.homecity=localStorage.getItem('cityName');
		}
	}

	ngOnInit(): void {

	}
	
	 
	addValue=(data:any)=>{
		
		this.calOut="";
		
		if(data.input1!="" && data.input2!=""){
		data.operationType="Add";
		this.userservice.caluclation(data).subscribe(response  => {
							this.totalresponse=response;
				
				 if(this.totalresponse.status=="true"){
				  this.calOut=this.totalresponse.result;
				  }		
			},
			error =>  {
				console.log(error);
			});
			}
		
		
	}
	
	subValue=(data:any)=>{
		
		
	this.calOut="";
		
		if(data.input1!="" && data.input2!=""){
		data.operationType="Substract";
		this.userservice.caluclation(data).subscribe(response  => {
							this.totalresponse=response;
							
							
				 if(this.totalresponse.status=="true"){
				  this.calOut=this.totalresponse.result;
				  }	
			},
			error =>  {
				console.log(error);
			});
			}
		
	}
	
	mulValue=(data:any)=>{
		
	
		this.calOut="";
		if(data.input1!="" && data.input2!=""){
		data.operationType="Multiply";
		this.userservice.caluclation(data).subscribe(response  => {
							this.totalresponse=response;
				 if(this.totalresponse.status=="true"){
				  this.calOut=this.totalresponse.result;
				  }		
			},
			error =>  {
				console.log(error);
			});
			}
		
	}
	
	divValue=(data:any)=>{
		
		this.calOut="";
		
		if(data.input1!="" && data.input2!=""){
		data.operationType="Division";
		this.userservice.caluclation(data).subscribe(response  => {
							this.totalresponse=response;
							
				 if(this.totalresponse.status=="true"){
				  this.calOut=this.totalresponse.result;
				  }		
			},
			error =>  {
				console.log(error);
			});
			}
		
	}
	scrolltodown():void{
		
		window.scrollTo(1,700);
	}

}