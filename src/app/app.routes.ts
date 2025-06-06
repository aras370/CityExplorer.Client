import { Routes } from '@angular/router';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddPlaceByUserComponent } from './pages/addplacebyuser/addplacebyuser.component';
import { AdminPanelComponent } from './pages/adminpanel/adminpanel.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'PlaceDetail', component: PlaceDetailComponent },
    { path: 'Places', component: PlacesComponent },
    { path: 'Aboutus', component: AboutusComponent },
    { path: 'ContactUs', component: ContactUsComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },
    { path: 'addplacebyuser', component: AddPlaceByUserComponent },
    { path: 'adminpanel', component: AdminPanelComponent },
    { path: '**', redirectTo: '' } // مهم!
];
