import { Injectable } from '@angular/core';

@Injectable()
export class AutomobileBrands {

	constructor(){
		
	}

	getAutomobileBrands(atype:string) {
		switch(atype){
			case 'Four Wheelers' :
			return [
			"Maruti Suzuki",
			"Hyundai",
			"Honda",
			"Mahindra",
			"Toyota",
			"Tata",
			];
			case 'Two Wheelers' :
			return [
			""
			];
			default :
			return null;
		}
	}

}