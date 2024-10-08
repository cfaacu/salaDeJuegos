import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from '../../clases/mensaje';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatService: ChatService;
  authService: AuthService;
  mensaje!: string;
  mensajes: Mensaje[] = [];

  constructor(private chat: ChatService, private auth: AuthService) {
    this.chatService = chat;
    this.authService = auth;
  }

  enviarMensaje() {
    if (!this.mensaje) return;
    const usuario = this.authService.getUser;
    const mensaje = { 
      usuario: usuario, 
      hora: Timestamp.now(),  
      mensaje: this.mensaje 
    };
    this.chatService.createMensaje(mensaje).then(() => {
      this.mensaje = ''; 
    });
  }

  ngOnInit(): void {
    this.chat.getMensajes().subscribe((data: Mensaje[]) => {
      this.mensajes = data.map(m => ({
        ...m,
        hora: m.hora instanceof Timestamp ? m.hora : new Timestamp(0, 0)
      }));
    });
  }

  // Método para formatear la hora
  formatHora(hora: any): string {
    return hora instanceof Timestamp ? hora.toDate().toLocaleString() : "Error en la fecha";
  }
}
