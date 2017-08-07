
import { Title } from '@angular/platform-browser';
import { BookingService } from '../../../services/booking/booking.service';
import { UserService } from '../../../services/user/user.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';




import { SideMenuComponent } from '../../../components/navigation/side-menu/side-menu.component';

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	moduleId: module.id,
	selector: 'ss-page-dashboard',
	templateUrl: './Failure.html',
	styleUrls: [ '../style.css' ],
})
export class Failure{
	private amount: string;
  private txnid: string;
  private status: string;
  private date: Date;
  private sub: Subscription;
  
	constructor(private route: ActivatedRoute,private router: Router,private titleService: Title,private userService: UserService,private _sanitizer: DomSanitizer,private bookingService:BookingService) { 
	   
	}
	
	 ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      this.amount = params['amount'];
      this.txnid = params['txnid'];
      this.status = params['status'];
      this.date = new Date();
      
      
     
    });
  }

	
}