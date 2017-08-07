import { Component, OnInit, animate, state, style, transition, trigger  } from '@angular/core';
import { Title,BrowserModule }     from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../../services/user/user.service';
import { LocalityService } from '../../../services/locality/locality.service';

import { ApiResponse } from '../../../models/ApiResponse';

declare var FB: any;

@Component({
	moduleId: module.id,
	selector: 'side-menu',
	templateUrl: 'side-menu.html',
	styleUrls: [ './style.css' ],
})
export class SideMenuComponent implements OnInit {
	public user: any;
	public link: string;
	public city:any;
	
	constructor(private localityService:LocalityService,private titleService: Title,private userService: UserService,private router : Router,private route: ActivatedRoute) {
		this.titleService.setTitle('Demo - Dashboard');
		this.user = this.userService.getLocalUser();
		
		let url:any = route.url;
		this.link = url._value[1].path;
		if(localStorage.getItem('cityID')!=null){
			
			this.localityService.getCityName(localStorage.getItem('cityID')).subscribe(
 			
 			cityname => {
 			
 				this.city = cityname;	
 				
 						
 			},
 			error =>  {
 				this.handleError(error)
 			}
		);	
		}else{
			
		}
	}

	ngOnInit(){

	}
	handleError(error:any) : void {
 		console.log(error);
 	}
}