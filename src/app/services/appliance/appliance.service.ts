import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/ApiResponse';

import { ApplianceBrands } from './brands.service';
import { ApplianceCapacity } from './capacity.service';
import { ApplianceType } from './type.service';
import { ApplianceWork } from './work.service';

@Injectable()
export class ApplianceService {

  constructor(public brands: ApplianceBrands,public work: ApplianceWork,
    public type: ApplianceType,public capacity: ApplianceCapacity){

  }

  getAppliances() {
    return [
    'Washing Machine',
    'Television',
    'Refrigerator',
    'Air Conditioner',
    'Microwaves',
    'Chimney',
    'Fans',
    'Geyser',
    'Water Purifier'
    ];
  }

  getApplianceBrands(atype:string){
    return this.brands.getApplianceBrands(atype);
  }
  
  getApplianceWork(atype:string){
    return this.work.getApplianceWork(atype);
  }
  
  getApplianceType(atype:string){
    return this.type.getApplianceType(atype);
  }
  
  getApplianceCapacity(atype:string){
    return this.capacity.getApplianceCapacity(atype);
  }


}