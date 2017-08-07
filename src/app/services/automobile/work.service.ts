import { Injectable } from '@angular/core';

@Injectable()
export class AutomobileWork {

	constructor(){
		
	}

	getAutomobileWork(atype:string) {
		switch(atype){
			case 'Four Wheelers' :
			return [
			"Brakes & Brakes Repair",
			"Oil Change",
			"Tires & Tires Repair",
			"Mufflers & Exhaust",
			"Check Engine Light",
			"Belts & Hoses",
			"Car Heating & A/C",
			"Steering & Suspension",
			"Lights, Wiper & Accessories",
			"Batteries, Starting & Charging",
			"Radiator & Engine Cooling",
			"Fleet Service",
			"Dents & Paints",
			"Washing",
			"Others"

			];
			case 'Two Wheelers' :
			return [
			"Brakes & Brakes Repair",
			"Oil Change",
			"Tires  & Tires Repair",
			"Dents & Paints",
			"Washing",
			"Lights & Accessories",
			"Batteries, Starting & Charging",
			"Others"
			];
			default :
			return null;
		}
	}
}