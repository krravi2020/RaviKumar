import { Component} from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
	selector: 'my-app',
	template: `<router-outlet></router-outlet>`,
})
export class AppComponent{ 
	name = 'Demo';
	public loginStatus:boolean;

	public constructor(private titleService: Title) {
		titleService.setTitle(this.name);
	} 

	ngOnInit(){
	}

}
