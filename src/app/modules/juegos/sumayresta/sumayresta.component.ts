import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Puntuacion } from '../../../clases/puntuacion';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-sumayresta',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sumayresta.component.html',
  styleUrl: './sumayresta.component.css'
})
export class SumayrestaComponent {
  numbers: number[] = [];
  currentOperators: ('+' | '-')[] = [];
  userAnswer: number | null = null;
  score: number = 0;
  attempts: number = 3;
  result: number | null = null;
  gameStarted: boolean = false;
  count: number = 0; // Contador de números mostrados
  canAnswer: boolean = false; // Controlar cuándo se puede responder
  displayedNumber: number | null = null; // Número actualmente mostrado
  message: string | null = null; // Mensaje a mostrar
  messageClass: string | null = null; // Clase CSS para el mensaje

  ngOnInit() {}

  constructor(public auth: AuthService, public storage : StorageService){}
  startGame() {
    this.score = 0;
    this.attempts = 3;
    this.userAnswer = null;
    this.numbers = [];
    this.currentOperators = [];
    this.count = 0;
    this.gameStarted = true;
    this.canAnswer = false;
    this.message = null;
    this.generateNewNumber();
  }

  generateNewNumber() {
    if (this.count < 5) {
      this.displayedNumber = this.getRandomNumber();
      this.numbers.push(this.displayedNumber);
      
      if (this.count > 0) {
        const operator = Math.random() < 0.5 ? '+' : '-';
        this.currentOperators.push(operator);
      }

      setTimeout(() => {
        this.count++;
        this.generateNewNumber();
      }, 2000);
    } else {
      this.calculateResult();
      this.canAnswer = true;
    }
  }

  calculateResult() {
    this.result = this.numbers[0];
    for (let i = 1; i < this.numbers.length; i++) {
      if (this.currentOperators[i - 1] === '+') {
        this.result += this.numbers[i];
      } else {
        this.result -= this.numbers[i];
      }
    }
  }

  submitAnswer() {
    if (this.userAnswer !== null && this.canAnswer) {
      if (this.userAnswer === this.result) {
        this.score += 10;
        this.message = '¡Respuesta correcta!';
        this.messageClass = 'correct';
      } else {
        this.attempts--;
        this.message = `Respuesta incorrecta. El resultado correcto es: ${this.result}`;
        this.messageClass = 'incorrect';
      }
  
      this.userAnswer = null;
  
      if (this.attempts === 0) {
        setTimeout(() => this.endGame(), 1500);
        this.message = `Perdiste, te quedaste sin intentos!`
        this.guardarPuntaje();
      } else {
        setTimeout(() => this.resetGame(), 1000);
      }
    } else if (!this.canAnswer) {
      this.message = 'Aún no puedes responder. Espera a que se muestren todos los números.';
      this.messageClass = null;
    }
  }

  endGame() {
    this.gameStarted = false;
    this.message = `Fin del juego. Tu puntuación es: ${this.score}`;
    this.messageClass = null;
  }

  resetGame() {
    this.numbers = [];
    this.currentOperators = [];
    this.count = 0;
    this.canAnswer = false;
    this.displayedNumber = null;
    this.message = null;
    this.generateNewNumber();
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  guardarPuntaje() {
    if (this.auth.usuario) {
      const puntuacion: Puntuacion = {
        email: this.auth.usuario.email,
        puntuacion: this.score,
        fecha: new Date(),
        juego: 'sumayresta'
      };

      this.storage.saveDocNoId(puntuacion, 'puntuaciones')
        .then(() => {
          console.log('Puntuación guardada con éxito');
        })
        .catch((error) => {
          console.error('Error al guardar la puntuación: ', error);
        });
    }
  }
}
