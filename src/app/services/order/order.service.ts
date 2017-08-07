// Imports
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';

// Import basic endpoint to extend from 
declare var localStorage: any;

@Injectable()
export class OrderService{
    // Resolve HTTP using the constructor
    constructor () {
    }
  
    // Get Local Storage Details
    setOrderLocalUser(data:any):any{
        localStorage.setItem('ss-order',JSON.stringify(data));
    }
    getOrderLocalUser():any{
        return JSON.parse(localStorage.getItem('ss-order'));
    }

    // Delete Local Storage Details
    deleteLocalUser():any{
        localStorage.removeItem('ss-order');
    }

   
       
}