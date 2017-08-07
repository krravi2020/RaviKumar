import { NgModule }      from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { HttpModule }    from '@angular/http';
import { ReactiveFormsModule,FormsModule }   from '@angular/forms';
 import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
//Import All Components
import { AppComponent }  from './app.component';
import { HomeComponent }  from './pages/home/home.component';
import { MainNavComponent }  from './components/navigation/main-nav/main.nav.component';
import { SideMenuComponent }  from './components/navigation/side-menu/side-menu.component';
//Account Settings
//import { Userdashboard }  from './pages/account/Userdashboard/userdashboard.component';

import { Dashboard }  from './pages/account/Dashboard/Dashboard.component';


import { ProfileComponent }  from './pages/account/profile/profile.component';
//import { BookingHistoryComponent }  from './pages/account/booking-history/booking-history.component';
import { MyAddressComponent }  from './pages/account/my-address/my-address.component';
// import { LoginComponent }  from './components/loginModal/login.component';
import { ApplianceRepairBooking }   from './pages/booking/forms/appliance-repair/appliance.component';
import { AutomobileMechanicBooking }   from './pages/booking/forms/automobile-mechanic/automobile.component';
import { CarCleaningBooking }   from './pages/booking/forms/car-cleaning/carcleaning.component';
import { CarpenterBooking }   from './pages/booking/forms/carpenter/carpenter.component';
import { PlumberBooking }   from './pages/booking/forms/plumber/plumber.component';
import { ElectricianBooking }   from './pages/booking/forms/electrician/electrician.component';
import { PanditBooking }   from './pages/booking/forms/pandit/pandit.component';
import { PainterBooking }   from './pages/booking/forms/painter/painter.component';
import { DriverBooking }   from './pages/booking/forms/driver/driver.component';
import { CookBooking }   from './pages/booking/forms/cook/cook.component';
import { LaundryBooking }   from './pages/booking/forms/laundry/laundry.component';
import { HomeCleaningBooking }   from './pages/booking/forms/home-cleaning/home-cleaning.component';
import { BookHistory } from './pages/account/BookHistory/BookHistory.component';

import { Userdetails } from './pages/account/userdetails/Userdetails.component';

import { Failure } from './pages/account/payUfailure/Failure.component';
import { Success } from './pages/account/payUsuccess/Success.component';

//Import All Services
import { Endpoint }  from './services/endpoint.service';
import { BookingService }  from './services/booking/booking.service';
import { UserService }  from './services/user/user.service';
import { ZoneService }  from './services/zone/zone.service';
import { LocalityService }  from './services/locality/locality.service';
import { ApplianceService } from './services/appliance/appliance.service';
import { ApplianceCapacity } from './services/appliance/capacity.service';
import { ApplianceBrands } from './services/appliance/brands.service';
import { ApplianceWork } from './services/appliance/work.service';
import { ApplianceType } from './services/appliance/type.service';
import { AutomobileBrands } from './services/automobile/brands.service';
import { AutomobileWork } from './services/automobile/work.service';
import { AutomobileType } from './services/automobile/type.service';
import { AutomobileModel } from './services/automobile/model.service';
import { LoggedInGuard }  from './services/loggedIn.guard';
import { PageNotFoundComponent }  from './pages/error/pagenotfound.component';
//Import All Pipes
import {CapitalizePipe} from './pipes/capitalize.pipe';

@NgModule({
	imports: [ BrowserModule,AppRoutingModule,ReactiveFormsModule,HttpModule,FormsModule,Ng2AutoCompleteModule],
	declarations: [
		AppComponent,
		HomeComponent,
		MainNavComponent,
		SideMenuComponent,
		//Userdashboard,
		ProfileComponent,
		Dashboard,
		BookHistory,
		Userdetails,
		Failure,
		Success,
	//	BookingHistoryComponent,
		MyAddressComponent,
		PageNotFoundComponent,
		// Booking Services List
		ApplianceRepairBooking,
		AutomobileMechanicBooking,
		CarpenterBooking,
		PlumberBooking,
		ElectricianBooking,
		CarCleaningBooking,
		PanditBooking,
		DriverBooking,
		CookBooking,
		LaundryBooking,
		HomeCleaningBooking,
		PainterBooking,
		CapitalizePipe
	],
	providers: 	[ 
		Title,
		BookingService, 
		ZoneService, 
		LocalityService, 
		UserService,
		LoggedInGuard,
		ApplianceService,
		ApplianceCapacity,
		ApplianceBrands,
		ApplianceType,
		ApplianceWork,
		AutomobileBrands,
		AutomobileType,
		AutomobileWork,
		AutomobileModel,
	],
	bootstrap:    [ AppComponent ],
})
export class AppModule { }
