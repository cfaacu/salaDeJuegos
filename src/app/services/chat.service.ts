import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private rutaDeLaColeccion = 'mensajes';
  private referenciaAlaColeccion: any;

  constructor(private firestore: Firestore) {
    this.referenciaAlaColeccion = collection(this.firestore, this.rutaDeLaColeccion);
  }

  async createMensaje(mensaje: Mensaje): Promise<void> {
    await addDoc(this.referenciaAlaColeccion, { usuario:mensaje.usuario,hora:mensaje.hora,mensaje:mensaje.mensaje });
  }

  getMensajes(): Observable<Mensaje[]> {
    return collectionData(this.referenciaAlaColeccion) as Observable<Mensaje[]>;
  }

  getSortedMensajes(): Observable<Mensaje[]> {
    return this.getMensajes().pipe(
      map((mensajes: Mensaje[]) => mensajes.sort((a, b) => b.hora.localeCompare(a.hora)))
    );
  }
}
