import { Component, OnInit, trigger, transition, style, animate  } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BookingService } from '../../services/booking/booking.service';
import { UserService } from '../../services/user/user.service';

import { ApiResponse } from '../../models/ApiResponse';

@Component({
	
	selector: 'ss-page-booking',
	templateUrl: './index.html'
})
export class BookingComponent implements OnInit {

	public stage:number;
	public numberOfStages:number;
	public progress:number;
	public progressint:number;
	public stageStates:boolean[];

	constructor(public titleService: Title, public titleString:string, 
		public numStages:number) { 
		//Do initialization and construction of Component
		this.titleService.setTitle(titleString);
		this.stage = 1;
		this.numberOfStages = numStages;
		this.progress = 0;
		this.progressint =0;
		this.stageStates = [];
		
		for(var i=0;i < this.numberOfStages;i++){
		
			this.stageStates[i] = false;
		}
	}

	ngOnInit(): void {

	}

	public next(): void {
	//alert(this.stage+" <-next stage  bookingcomponent.ts in progressbar---> "+this.numberOfStages);
		if(this.stage < this.numberOfStages){
			this.stage++;
			this.progress = (100/this.numberOfStages)*this.stage;
			
			this.progressint = Math.round(this.progress);
			
		}
	}

	public previous(): void {
	
		if(this.stage > 1){
		
		
			this.stage--;
			this.progress = (100/this.numberOfStages)*this.stage;
			
			this.progressint = Math.round(this.progress);
			this.progressint = Math.round(this.progress);
		}
	}

}

