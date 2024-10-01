import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, collectionData, Firestore, orderBy, query} from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  usuarioLogueado! : string;
  msjError : string = "";
  
  constructor(private auth: AuthService)
  {
    
  }
  accesoRapido() 
  {
    this.password = "test@test.com";
    this.email = "test@test.com";
  }

  login() 
  {
    this.auth.singIn(this.email,this.password);
  }

  
}
