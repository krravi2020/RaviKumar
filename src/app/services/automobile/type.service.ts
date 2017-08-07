import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/ApiResponse';

import { AutomobileBrands } from './brands.service';
import { AutomobileModel } from './model.service';
import { AutomobileWork } from './work.service';

@Injectable()
export class AutomobileType {

	constructor(public brands: AutomobileBrands,public model: AutomobileModel,public work: AutomobileWork){
		
	}

	getAutomobileType() {
		return [
		"Four Wheelers",
		"Two Wheelers"
		];
	}

	getAutomobileModel(atype:string){
		return this.model.getAutomobileModel(atype);
	}

	getAutomobileBrands(atype:string){
		return this.brands.getAutomobileBrands(atype);
	}

	getAutomobileWork(atype:string){
		return this.work.getAutomobileWork(atype);
	}

}