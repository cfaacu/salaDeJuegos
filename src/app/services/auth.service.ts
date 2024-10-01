import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { Usuario } from '../clases/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean = false;
  usuario! : Usuario;

  constructor(public auth: Auth, private firestore : Firestore, private router : Router, private storage : StorageService) { }

  get getUser(): Usuario | undefined {
    return this.usuario
  }

  singIn(email :string, password : string)
  {
    signInWithEmailAndPassword(this.auth, email,password).then(async (res)=>{

      this.isLoggedIn = true;
      
      await this.storage.getById(res.user?.uid,"usuarios").then((res)=>{
          this.usuario = res;
          console.log("usuario", this.usuario);
      }).catch((e)=>{
        console.log(e);
      });

      let col = collection(this.firestore, "logs");
      addDoc(col, {fechaInicio: new Date(), usuario: email});

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logged In Succesfully',
      })
      this.router.navigate(["/home"]);
      }).catch((e)=> Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Datos Invalidos",
        showConfirmButton: false,
        timer: 1500
      }))
  }

  register(email : string, password : string)
  {
    createUserWithEmailAndPassword(this.auth,email,password).then((res)=>{
      
      this.storage.saveDoc({
        uid : res.user?.uid,
        email : email,
        isAdmin : false
      },"usuarios", res.user?.uid);

      this.singIn(email,password);

    }).catch((e)=>{
      var msjError;
      switch(e.code)
      {
        case "auth/invalid-email":
          msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          msjError = "El email ya esta en uso";
          break;
        case "auth/weak-password":
          msjError = "La contraseña es muy debil";
        break;
        default:
          msjError = e.code;
          break;
      }

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: msjError,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
