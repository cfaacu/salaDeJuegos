import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, collectionData, Firestore, orderBy, query} from '@angular/fire/firestore';

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
  
  constructor(public auth: Auth, private router : Router, private firestore : Firestore)
  {
    
  }
  accesoRapido() 
  {
    this.password = "test@test.com";
    this.email = "test@test.com";
  }

  login() 
  {
    signInWithEmailAndPassword(this.auth, this.email, this.password).then((res)=>{
    
    let col = collection(this.firestore, "logs");
    addDoc(col, {fechaInicio: new Date(), usuario: this.email});
    
    this.router.navigate(["/home"]);
    localStorage.setItem("username",this.email);
    }).catch((e)=> this.msjError = "Datos Invalidos")
  }

  
}
