import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre!:string;
  email!:string;
  password!:string;
  admin!:boolean;
  usuarioLogueado!:string;
  msjError:string = "";
  constructor(public auth:Auth, private router :Router)
  {

  }
  registro()
  {
    createUserWithEmailAndPassword(this.auth,this.email,this.password).then((res)=>{
      if(res.user.email !== null)
      {
          this.usuarioLogueado = res.user.email;
          this.router.navigate(["/home"]);
      } 
    }).catch((e)=>{
      console.log(e.code);
      switch(e.code)
      {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "El email ya esta en uso";
          break;
        case "auth/weak-password":
        this.msjError = "La contraseña es muy debil";
        break;
        default:
          this.msjError = e.code;
          break;
      }
    })
  }
}
