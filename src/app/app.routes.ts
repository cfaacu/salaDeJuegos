import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

export const routes: Routes = [
    {
         path: '', redirectTo: '/home', pathMatch: "full" 
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'quienSoy',
        component:QuienSoyComponent
    },
    {
        path:'**', pathMatch:'full', component: HomeComponent
    }
];
