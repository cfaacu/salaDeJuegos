import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  respuesta :boolean = false;

  accesoRapido() {
    this.password = "admin";
    this.email = "admin";
  }

  login() {
    if(this.email == "admin" && this.password == "admin")
    {
      this.respuesta = true;
    }
    else
    {
      this.respuesta = false;
    }
  }
}
