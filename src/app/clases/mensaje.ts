import { Timestamp } from '@angular/fire/firestore';

export interface Mensaje {
    usuario: any;  
    hora: Timestamp;  
    mensaje: string;
}
