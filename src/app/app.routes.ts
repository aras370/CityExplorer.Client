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
    { path: 'placeDetail/:id', component: PlaceDetailComponent },
    { path: 'places', component: PlacesComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'addplacebyuser', component: AddPlaceByUserComponent },
    { path: 'adminpanel', component: AdminPanelComponent },
    { path: '**', redirectTo: '' } // مهم!
];
