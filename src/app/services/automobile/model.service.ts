import { Injectable } from '@angular/core';

@Injectable()
export class AutomobileModel {

	constructor(){
		
	}
	getAutomobileModel(atype:string) {
		switch(atype){
			case 'Maruti Suzuki' :
			return [
			"Omni",
			"Alto 800",
			"Alto K10",
			"Eeco",
			"Wagon R 1.0",
			"Celerio",
			"Stingray",
			"Ritz",
			"Swift",
			"Baleno",
			"Swift Dzire",
			"Gypsy",
			"Ertiga",
			"Brezza",
			"Ciaz",
			"S-Cross",
			];
			case 'Hyundai' :
			return [
			"Eon",
			"i10",
			"Grand i10",
			"Xcent",
			"Elite i20",
			"i20 Active",
			"Verna",
			"Creta",
			"Elantra",
			"Tucson",
			"Santa Fe"
			];
			case 'Honda' :
			return [
			"Brio",
			"Amaze",
			"Jazz",
			"Mobilio",
			"Honda City",
			"Honda BR-V",
			"Honda CR-V",
			"Accord"
			];
			case 'Mahindra' :
			return [
			"KUV 100",
			"Verito",
			"Thar",
			"Bolero",
			"Verito Vibe CS",
			"e20 Plus",
			"TUV 300",
			"Nuvo Sport",
			"Xylo",
			"Scorpio",
			"XUV 500",
			];
			case 'Toyota' :
			return [
			"Etios Liva",
			"Etios Cross",
			"Platinum Etios",
			"Corolla Altis",
			"Innova Crysta",
			"Fortuner",
			"Camry",
			"Land Cruiser Prado",
			"Land Cruiser "
			];
			case 'Tata' :
			return [
			"",
			];

			default :
			return null;
		}
	}
}