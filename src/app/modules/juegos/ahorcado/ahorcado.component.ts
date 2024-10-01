import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  palabras: string[] = ['angular', 'typescript', 'programacion', 'desarrollo'];
  palabraSeleccionada: string = '';
  letrasIngresadas: string[] = [];
  maxIntentos: number = 6;
  intentosRestantes: number = this.maxIntentos;
  puntaje: number = 0;

  constructor() {
    this.seleccionarPalabra();
  }

  seleccionarPalabra() {
    const indice = Math.floor(Math.random() * this.palabras.length);
    this.palabraSeleccionada = this.palabras[indice].toLowerCase();
  }

  ingresarLetra(letra: string) {    
    if (!this.letrasIngresadas.includes(letra)) {
      this.letrasIngresadas.push(letra);
      
      if (!this.palabraSeleccionada.includes(letra.toLowerCase())) {
        this.intentosRestantes--;
      } else {
        console.log('Letra correcta');
      }
    }
  }

  get palabraMostrada() {
    return this.palabraSeleccionada.split('').map(letra => 
      this.letrasIngresadas.includes(letra) ? letra : '_'
    ).join(' ');
  }

  isJuegoTerminado() {
    return this.intentosRestantes <= 0 || this.hasGanado();
  }

  hasGanado(): boolean {
    const ganado = this.palabraSeleccionada.split('').every(letra => this.letrasIngresadas.includes(letra));
    if (ganado) {
      this.puntaje += 10;
      console.log('¡Ganaste! Puntaje actual:', this.puntaje);
    }
    return ganado;
  }

  reiniciarJuego() {
    this.letrasIngresadas = [];
    this.intentosRestantes = this.maxIntentos;
    this.seleccionarPalabra();
  }
}
