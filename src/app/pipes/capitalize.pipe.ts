import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
	
	transform(value:any) {
        if (value) {
			let parts = value.split(" ");
	        for(var i=0,len=parts.length; i < len; i++){
	        	parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
	        }
        	return parts.join(" ");
        }else{
        	return value;
        }
    }

}