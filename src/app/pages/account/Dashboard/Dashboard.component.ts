import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookingService } from '../../../services/booking/booking.service';
import { UserService } from '../../../services/user/user.service';


import { SideMenuComponent } from '../../../components/navigation/side-menu/side-menu.component';

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	moduleId: module.id,
	selector: 'ss-page-dashboard',
	templateUrl: './Dashboard.html',
	styleUrls: [ '../style.css' ],
})
export class Dashboard{
	
  
	constructor(private titleService: Title,private userService: UserService,private _sanitizer: DomSanitizer,private bookingService:BookingService) { 
	
	
	}

	ngOnInit(): void {
		
	
	}
	
	
	

	
}