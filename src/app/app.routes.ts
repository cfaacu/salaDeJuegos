import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { authGuard } from './guards/auth.guard';

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
        path:'registrar',
        component:RegistroComponent
    },
    {
        path:'encuesta',
        component:EncuestaComponent,
        canActivate: [authGuard]
    },
    {
        path: 'juegos',
        loadChildren: ()=> import ('./modules/juegos/juegos.module').then(m => m.JuegosModule),
        canActivate: [authGuard]
    },
    {
        path:'**', pathMatch:'full', component: HomeComponent
    }
];
