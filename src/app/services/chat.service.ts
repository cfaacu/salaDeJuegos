import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';
import { Timestamp } from '@angular/fire/firestore'; 

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
    await addDoc(this.referenciaAlaColeccion, {
      usuario: mensaje.usuario,
      hora: Timestamp.now(),  // Asegúrate de usar Timestamp
      mensaje: mensaje.mensaje
    });
  }

  getMensajes(): Observable<Mensaje[]> {
    const mensajesQuery = query(this.referenciaAlaColeccion, orderBy('hora'));
    return collectionData(mensajesQuery).pipe(
      map((data: any[]) => data.map(item => ({
        ...item,
        hora: item.hora instanceof Timestamp ? item.hora : new Timestamp(0, 0) // Manejar caso en que no sea Timestamp
      })))
    );
  }
}
