import { Component } from '@angular/core';
import { Puntuacion } from '../../../clases/puntuacion';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  palabras: string[] = ['angular', 'typescript', 'programacion', 'desarrollo'];
  palabraSeleccionada: string = '';
  letrasIngresadas: string[] = [];
  maxIntentosPorPalabra: number = 6;
  intentosRestantesPorPalabra: number = this.maxIntentosPorPalabra;
  maxIntentos: number = 3;
  intentosRestantes: number = this.maxIntentos;
  puntaje: number = 0;
  mensaje: string = '';
  adivinaste: boolean = false;

  // Array de imágenes
  imagenes: string[] = [
    'https://i.postimg.cc/mD0RtBvB/ahorcado1.png',
    'https://i.postimg.cc/MK0xpkdJ/ahorcado2.png',
    'https://i.postimg.cc/mg8s7Qvd/ahorcado3.png',
    'https://i.postimg.cc/3rmQt5M0/ahorcado4.png',
    'https://i.postimg.cc/TYcMXV3R/ahorcado5.png',
    'https://i.postimg.cc/Hn4KdmHS/ahorcado6.png',
    'https://i.postimg.cc/nLjPMBp9/ahorcado7.png'
  ];

  constructor(public auth: AuthService, public storage: StorageService) {
    this.seleccionarPalabra();
  }

  seleccionarPalabra() {
    const indice = Math.floor(Math.random() * this.palabras.length);
    this.palabraSeleccionada = this.palabras[indice].toLowerCase();
    this.letrasIngresadas = [];
    this.intentosRestantesPorPalabra = this.maxIntentosPorPalabra;
  }

  ingresarLetra(letra: string) {
    if (!this.letrasIngresadas.includes(letra) && this.intentosRestantes > 0) {
      this.letrasIngresadas.push(letra);

      if (!this.palabraSeleccionada.includes(letra.toLowerCase())) {
        this.intentosRestantesPorPalabra--;
      }

      if (this.hasGanado()) {
        this.puntaje += 10; // Sumar puntos al ganar
        this.mensaje = `¡Ganaste! La palabra era "${this.palabraSeleccionada}".`;
        setTimeout(() => this.seleccionarPalabra(), 2000);
      } else if (this.intentosRestantesPorPalabra <= 0) {
        this.mensaje = `Perdiste la palabra: "${this.palabraSeleccionada}".`;
        this.intentosRestantes--; // Restar un intento total
        if (this.intentosRestantes > 0) {
          setTimeout(() => {
            this.seleccionarPalabra(); // Nueva palabra
          }, 2000);
        } else {
          this.finalizarJuego();
          this.puntaje = 0
        }
      }
    }
  }

  get palabraMostrada() {
    return this.palabraSeleccionada.split('').map(letra =>
      this.letrasIngresadas.includes(letra) ? letra : '_'
    ).join(' ');
  }

  isJuegoTerminado() {
    return this.intentosRestantes <= 0;
  }

  hasGanado(): boolean {
    this.adivinaste = true;
    return this.palabraSeleccionada.split('').every(letra => this.letrasIngresadas.includes(letra));
  }

  finalizarJuego() {
    const puntuacion: Puntuacion = {
      email: this.auth.usuario.email,
      puntuacion: this.puntaje,
      fecha: new Date(),
      juego: 'ahorcado'
    };

    this.storage.saveDocNoId(puntuacion, 'puntuaciones')
      .then(() => {
        console.log('Puntuación guardada con éxito');
      })
      .catch((error) => {
        console.error('Error al guardar la puntuación: ', error);
      });
  }

  reiniciarJuego() {
    this.letrasIngresadas = [];
    this.intentosRestantes = this.maxIntentos;
    this.seleccionarPalabra();
  }

  get imagenActual() {
    return this.imagenes[this.maxIntentosPorPalabra - this.intentosRestantesPorPalabra];
  }
}
