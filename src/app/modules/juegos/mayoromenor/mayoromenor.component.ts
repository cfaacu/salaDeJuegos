import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/deck.service';
import { Carta } from '../../../clases/carta';

@Component({
  selector: 'app-mayoromenor',
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.css'],
})
export class MayoromenorComponent implements OnInit {
  cartaActual: Carta | null = null;
  cartaSiguiente: Carta | null = null;
  puntaje: number = 0;
  intentos: number = 4;
  mensaje: string = '';
  juegoTerminado: boolean = false;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  async iniciarJuego(): Promise<void> {
    this.deckService.crearMazo().subscribe(async (deck) => {
      this.deckService.setDeckId(deck.deck_id);
      this.puntaje = 0;
      this.intentos = 4;
      this.mensaje = '';
      this.juegoTerminado = false;
  
      // Saca las cartas iniciales
      this.cartaActual = await this.sacarCarta();
      this.cartaSiguiente = await this.sacarCarta();
  
      console.log('Carta Actual:', this.cartaActual);
      console.log('Carta Siguiente:', this.cartaSiguiente);
    });
  }
  
  

  sacarCarta(): Promise<Carta> {
    return new Promise((resolve, reject) => {
      this.deckService.sacarCarta().subscribe({
        next: ({ cards }) => {
          if (cards.length > 0) {
            resolve(cards[0]);
          } else {
            reject('No se recibieron cartas.');
          }
        },
        error: (err) => {
          console.error('Error al sacar carta:', err);
          reject('No se pudo obtener la carta. Intenta de nuevo.');
        }
      });
    });
  }
  
  
  

  async adivinar(opcion: 'mayor' | 'menor'): Promise<void> {
    if (!this.cartaSiguiente || !this.cartaActual) {
      this.mensaje = 'No hay carta actual o siguiente para adivinar.';
      return;
    }
  
    const valorActual = this.obtenerValor(this.cartaActual.value);
    const valorSiguiente = this.obtenerValor(this.cartaSiguiente.value);
  
    // Verifica la adivinanza
    if ((opcion === 'mayor' && valorSiguiente > valorActual) || 
        (opcion === 'menor' && valorSiguiente < valorActual)) {
      this.puntaje += 10;
      this.mensaje = '¡Correcto!';
    } else {
      this.intentos--;
      this.mensaje = `Incorrecto, te quedan ${this.intentos} intentos.`;
      if (this.intentos === 0) {
        this.juegoTerminado = true;
        this.mensaje = '¡Perdiste! ¿Quieres volver a jugar?';
      }
    }
  
    // Actualiza las cartas
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = await this.sacarCarta(); // Saca una nueva carta
  
    // Verifica que la nueva carta no sea null
    if (this.cartaSiguiente) {
      console.log('Nueva Carta Siguiente:', this.cartaSiguiente);
    } else {
      this.mensaje = 'No se pudo obtener la carta siguiente.';
    }
  }
  
  
  
  
  

  obtenerValor(valor: string): number {
    const valores: { [key: string]: number } = {
      'ACE': 14,
      'KING': 13,
      'QUEEN': 12,
      'JACK': 11,
      '10': 10,
      '9': 9,
      '8': 8,
      '7': 7,
      '6': 6,
      '5': 5,
      '4': 4,
      '3': 3,
      '2': 2,
    };
    return valores[valor] || 0;
  }
  

  volverAJugar(): void {
    this.iniciarJuego();
  }
}
