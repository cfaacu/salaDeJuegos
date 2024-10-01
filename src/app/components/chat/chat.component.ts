import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from '../../clases/mensaje';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  chatService: ChatService;
  authService: AuthService;
  mensaje!: string;
  mensajes: Mensaje[] = [];

  constructor(private chat: ChatService, private auth: AuthService) {
    this.chatService = chat;
    this.authService = auth;
    this.chat.getMensajes().subscribe((data: Mensaje[]) => this.mensajes = data.reverse());
  }

  enviarMensaje() {
    if (!this.mensaje) return;
    const usuario = this.authService.getUser;
    const now = new Date();
    const mensaje = { usuario: usuario, hora: now.toLocaleString(), mensaje: this.mensaje };
    this.chatService.createMensaje(mensaje);
    this.mensaje = '';
  }

  ngOnInit(): void {
  }

}
