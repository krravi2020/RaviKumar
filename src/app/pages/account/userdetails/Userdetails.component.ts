import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';

import { ApiResponse } from '../../../models/ApiResponse';

@Component({
	moduleId: module.id,
	selector: 'order-history',
	templateUrl: './Userdetails.html',
	styleUrls: [ '../style.css' ],
	providers:[UserService, BookingService],
})
export class Userdetails {
	public user: any;
	public uid: string;
	public bid: any;
	public bookingss: any;
	public status: any;
	public viewDetails:boolean=false;
	public viewInvoce:boolean=false;
	public bookingNumber:string;
	public cost:number;
	public location:string;

	constructor(private titleService: Title,private userService: UserService,private bookService: BookingService) { 
		this.titleService.setTitle('Service Sathi - Profile Settings');
		this.user = this.userService.getLocalUser();
		this.uid = this.user.id;
    	this.bookService.getBookingsForuser(this.uid)
		.subscribe(
			response  => {
				//console.log(response);
				this.bookingss = response;

			},
			error =>  console.log(error)
			);
			

	}

	ngOnInit(): void {

	}

	viewDetailsModal(data:any): any {
	
	this.bookingNumber=data.number;
	this.cost=data.bill;
	this.location=""+data.house+", "+data.landmark+", "+data.locality+"";
	
	this.viewDetails=true;
		
	}

viewdeatilsdiss():void {
	this.viewDetails=false;
}

viewinvoicediss() :void {
this.viewInvoce=false;
	
}
	viewInvoiceModal(data:any): any{
	
	this.bookingNumber=data.number;
	this.cost=data.bill;
	this.location=""+data.house+", "+data.landmark+", "+data.locality+"";
	
	this.viewInvoce=true;

	}


}