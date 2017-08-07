import { Component, OnInit } from '@angular/core';
import { Title,BrowserModule }     from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'ss-page-404',
	templateUrl: './404.html',
	styleUrls: [ './style.css' ]
})
export class PageNotFoundComponent implements OnInit {

	constructor(private titleService: Title) { 
		this.titleService.setTitle('Service Sathi - Not Found');
	}

	ngOnInit(): void {

	}

}