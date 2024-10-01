import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  pokemon: any;
  opciones: any[] = [];
  mensaje: string = '';
  mensajeClase: string = '';
  puntaje: number = 0;
  intentos: number = 0; // Contador de intentos
  maxIntentos: number = 5; // Límite de intentos
  juegoTerminado: boolean = false; // Bandera para el estado del juego

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.generarPregunta();
  }

  generarPregunta() {
    if (this.intentos < this.maxIntentos) {
      this.pokemonService.getRandomPokemon().subscribe(p => {
        // Generar las opciones justo después de recibir el Pokémon
        this.generarOpciones(p);
      });
    } else {
      this.juegoTerminado = true; // Terminar el juego si se alcanzó el límite de intentos
    }
  }
  

  generarOpciones(correctAnswer: any) {
    // Generar 3 opciones incorrectas
    this.pokemonService.getPokemonOptions(3).subscribe(pokemons => {
      this.pokemon = correctAnswer;
      this.opciones = [correctAnswer.name];
      
      // Agregar opciones incorrectas
      pokemons.forEach(p => {
        if (!this.opciones.includes(p.name)) {
          this.opciones.push(p.name);
        }
      });
      
      // Mezclar las opciones
      this.opciones.sort(() => Math.random() - 0.5);
      
      // Aquí puedes añadir una notificación o mensaje que indique que ya están las opciones listas
    });
  }
  

  evaluarRespuesta(opcion: string) {
    if (opcion === this.pokemon.name) {
      this.puntaje += 10;
      this.mensaje = '¡Correcto!';
      this.mensajeClase = 'correct';
    } else {
      this.mensaje = `Incorrecto. El Pokémon era ${this.pokemon.name}.`;
      this.mensajeClase = 'incorrect';
      this.intentos++; // Incrementar el contador de intentos
    }

    // Generar nueva pregunta o terminar el juego
    if (this.intentos < this.maxIntentos) {
      this.generarPregunta();
    } else {
      this.juegoTerminado = true; // Terminar el juego si se alcanzó el límite de intentos
    }
  }

  reiniciarJuego() {
    this.puntaje = 0;
    this.intentos = 0;
    this.juegoTerminado = false;
    this.generarPregunta();
  }
}
