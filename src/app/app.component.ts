import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { Auth , signOut} from '@angular/fire/auth';
import { CommonModule, NgIf } from '@angular/common';
import { JuegosModule } from './modules/juegos/juegos.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule, RouterModule, JuegosModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'salaDeJuegos';
  constructor(public auth: Auth)
  {
  }

  logOut()
  {
    signOut(this.auth);
  }
}
