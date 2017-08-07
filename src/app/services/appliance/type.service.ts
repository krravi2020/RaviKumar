import { Injectable } from '@angular/core';

@Injectable()
export class ApplianceType {

	constructor(){
		
	}
	getApplianceType(atype:string) {
		switch(atype){
			case 'Washing Machine' :
			return [
			"Fully Automatic Front Load",
			"Fully Automatic Top Load",
			"Semi Automatic  Front Load",
			"Semi Automatic Top Load"
			];
			case 'Television' :
			return [
			"LED",
			"LCD",
			"TFT",
			"4K"
			];
			case 'Refrigerator' :
			return [
			"Single Door",
			"Double Door",
			"Triple Door",
			"Side by Side"
			];
			case 'Air Conditioner':
			return [
			"Split AC",
			"Window AC"
			];
			case 'Microwaves':
			return [
			"Convection",
			"Grill",
			"Solo"
			];
			case 'Chimney':
			return [
			"none"
			];
			case 'Geyser':
			return [
			
			"Electric",
			"Gas",
			"Instant",
			"Storage"
			];
			case 'Fans':
			return [
			"Ceiling",
			"Exhaust",
			"Pedestal",
			"Table",
			"Tower",
			"Wall"
			];
			case 'Water Purifier':
			return [
			"Electrical & Storage",
			"Non- Electrical & Storage",
			"Electical & Non-Storage",
			"Non- Electrical & Non Storage"
			];
			default :
			return null;
		}
	}
}