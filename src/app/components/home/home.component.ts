import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { ChatComponent } from "../chat/chat.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showChat: boolean = false;
  buttonText: string = 'Mostrar Chat';

  constructor(public auth:AuthService)
  {

  }

  toggleChat(): void {
    this.showChat = !this.showChat;
    this.buttonText = this.showChat ? 'X' : 'Mostrar Chat';
  }
}
