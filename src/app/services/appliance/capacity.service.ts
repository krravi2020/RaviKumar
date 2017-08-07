import { Injectable } from '@angular/core';

@Injectable()
export class ApplianceCapacity {
	
	constructor(){
		
	}
	getApplianceCapacity(atype:string) {
		switch(atype){
			case 'Washing Machine' :
			return [
			"6Kg & Below",
			"6.1 - 7 kg",
			"7.1 - 8 kg",
			"8.1kg & Above"
			];
			case 'Television' :
			return [
			"10 - 20 inch",
			"20-30 inch",
			"30-40 inch",
			"40 & above"
			];
			case 'Refrigerator' :
			return [
			"Upto 80L",
			"80-170 L",
			"170-200 L",
			"201-250 L",
			"251-300 L",
			"301-350 L",
			"351 & Above"
			];
			case 'Air Conditioner':
			return [
			"0.75 Ton",
			"0.8 Ton",
			"1 Ton",
			"1.1 Ton",
			"1.2 Ton",
			"1.5 Ton",
			"2 Ton"
			];
			case 'Microwaves':
			return [
			"Upto 19L",			
			"20-22 L",
			"23-25 L",
			"26-28 L",
			"29L & Above"
			];
			case 'Chimney':
			return [
			"none"
			];
			case 'Fans':
			return [
			"none"
			];
			case 'Geyser':
			return [
			"11-20 L",
			"21-30 L",
			"6-10 L",
			"Above 10L"
			];
			case 'Water Purifier':
			return [
			"RO",
			"RO + UV",
			"Gravity Based",
			"UV",
			"RO + UV+ UF",
			"UF",
			"UV+UF"
			];
			default :
			return null;
		}
	}

}