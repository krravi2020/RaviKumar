import { Injectable } from '@angular/core';

@Injectable()
export class ApplianceWork {

	constructor(){
		
	}
	getApplianceWork(atype:string) {
		switch(atype){
			case 'Washing Machine' :
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Television' :
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Refrigerator' :
			return [
			"Install",
			"Repair",
			"Servicing",
			"Gas Refill",
			"Others"
			];
			case 'Air Conditioner':
			return [
			"Install",
			"Uninstallation",
			"Repair",
			"Servicing",
			"Gas Refill",
			"New Socket Fixing",
			"Others"
			];
			case 'Microwaves':
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Chimney':
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Geyser':
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Fans':
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			case 'Water Purifier':
			return [
			"Install",
			"Repair",
			"Servicing",
			"Others"
			];
			default :
			return null;
		}
	}


}