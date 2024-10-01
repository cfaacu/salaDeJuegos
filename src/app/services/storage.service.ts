import { Injectable } from '@angular/core';
import { setDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private firestore: Firestore) { }

  saveDoc(data: any, path: string, id: string) {
    const docRef = doc(this.firestore, `${path}/${id}`);
    return setDoc(docRef, data);
  }

  async getById(id: string, path: string): Promise<any> {
    const docRef = doc(this.firestore, `${path}/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); 
    } else {
      throw new Error('Documento no encontrado');
    }
  }
}
