import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './pages/home/home.component';
import { MainNavComponent }  from './components/navigation/main-nav/main.nav.component';
import { SideMenuComponent }  from './components/navigation/side-menu/side-menu.component';
// import { LoginComponent }  from './components/loginModal/login.component';
import { PageNotFoundComponent }  from './pages/error/pagenotfound.component';
// Components for Booking forms
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


import { Dashboard } from './pages/account/Dashboard/Dashboard.component';



import { Failure } from './pages/account/payUfailure/Failure.component';
import { Success } from './pages/account/payUsuccess/Success.component';

// Components for Dashboard Pages
//import { Userdashboard } from './pages/account/Userdashboard/userdashboard.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
//import { BookingHistoryComponent }  from './pages/account/booking-history/booking-history.component';
import { MyAddressComponent } from './pages/account/my-address/my-address.component';

// Services for WebApp
import { LoggedInGuard } from './services/loggedIn.guard';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: MainNavComponent },
	
	{ path: 'booking/appliance-repair', component: ApplianceRepairBooking },
	{ path: 'booking/automobile-mechanic', component: AutomobileMechanicBooking },
	{ path: 'booking/car-cleaning', component: CarCleaningBooking },
	{ path: 'booking/carpenter', component: CarpenterBooking },
	{ path: 'booking/plumber', component: PlumberBooking },
	{ path: 'booking/electrician', component: ElectricianBooking },
	{ path: 'booking/pandit', component: PanditBooking },
	{ path: 'booking/driver', component: DriverBooking },
	{ path: 'booking/cook', component: CookBooking },
	{ path: 'booking/painter', component: PainterBooking },
	{ path: 'booking/home-cleaning', component: HomeCleaningBooking },
	{ path: 'booking/laundry', component: LaundryBooking },
{ path: 'account/BookHistory', component: BookHistory },
  {path: 'account/userdetails',  component:Userdetails},
  {path: 'account/dashboards',  component:Dashboard},
  

	{ path: 'account/failure', component: Failure },
	{ path: 'account/success', component: Success },

//	{ path: 'account/dashboard', component: Userdashboard, canActivate: [LoggedInGuard]},
	{ path: 'account/profile', component: ProfileComponent},
	//{ path: 'account/booking-history', component: BookingHistoryComponent, canActivate: [LoggedInGuard]},
	{ path: 'account/my-address', component: MyAddressComponent},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}