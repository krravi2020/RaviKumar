import { Injectable } from '@angular/core';

@Injectable()
export class ApplianceBrands {

	constructor(){
		
	}

	getApplianceBrands(atype:string) {
		switch(atype){
			case 'Washing Machine' :
			return [
			"Samsung",
			"LG",
			"Whirlpool",
			"IFB",
			"Onida",
			"Panasonic",
			"BPL",
			"Godrej",
			"Haier",
			"Lloyd",
			"Videocon",
			"Others"
			];
			case 'Television' :
			return [
			"Samsung",
			"LG",
			"Sony",
			"Philips",
			"Micromax",
			"Panasonic",
			"Intex",
			"Videocon",
			"Onida",
			"Lloyd",
			"Others"
			];
			case 'Refrigerator' :
			return [
			"Samsung",
			"LG",
			"Haier",
			"Sansui",
			"Electolux",
			"Godrej",
			"Whirlpool",
			"Hitachi",
			"Videocon",
			"Panasonic",
			"Others"
			];
			case 'Air Conditioner':
			return [
			"Samsung",
			"Voltas",
			"LG",
			"Blue Star", 
			"Hitachi",
			"Daikin",
			"Carrier",
			"Electrolux",
			"Godrej",
			"Haier",
			"Lloyd",
			"Panasonic",
			"Videocon",
			"Whirlpool",
			"Others"
			];
			case 'Microwaves':
			return [
			"Samsung",
			"LG",
			"IFB",
			"Bajaj", 
			"Morphy Richards", 
			"Whirlpool",
			"Electrolux",
			"Godrej",
			"Haier",
			"Kenstar",
			"Onida", 
			"Panasonic",
			"Others"
			];
			case 'Chimney':
			return [
			"Prestige",
			"Kaff",
			"Pigeon",
			"Glean",
			"Panasonic",
			"Others"
			];
			case 'Fans':
			return [
			"Havells",
			"Usha",
			"Bajaj",
			"Orient",
			"Crompton",
			"Anchor",
			"Kenstar",
			"Khaitan",
			"Morphy Richards",
			"Maharaja",
			"Orpat",
			"V Guard",
			"Others"
			];
			case 'Geyser':
			return [
			"Bajaj",
			"AO Smith",
			"Havells",
			"V Guard", 
			"Florex",
			"Hindware",
			"Haier",
			"Kenstar",
			"Khaitan",
			"Maharaja",
			"Orient",
			"Usha",
			"Others",
			];
			case 'Water Purifier':
			return [
			"Kent",
			"Aquaguard",
			"Pureit",
			"Eureka Forbes",
			"Livpure",
			"Hindustan Uniliver",
			];
			default :
			return null;
		}
	}
}