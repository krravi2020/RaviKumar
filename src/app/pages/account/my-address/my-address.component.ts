import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';
import { ApiResponse } from '../../../models/ApiResponse';

@Component({
	moduleId: module.id,
	selector: 'ss-page-dashboard',
	templateUrl: './my-address.html',
	styleUrls: [ '../style.css' ]
})
export class MyAddressComponent{
	public zones: any;
	constructor(private titleService: Title,private userService: UserService,private bookService: BookingService) { 
		
	}

	ngOnInit(): void {
		// this.bookService.getZones(this.uid)
		// .subscribe(
		// 	response  => {
		// 		this.zones = response;
		// 	},
		// 	error =>  console.log(error)
		// 	);
	}
}