import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { Puntuacion } from '../../../clases/puntuacion';

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
  intentos: number = 0; 
  maxIntentos: number = 5; 
  juegoTerminado: boolean = false;

  constructor(private pokemonService: PokemonService, public auth : AuthService, public storage : StorageService) {}

  ngOnInit() {
    this.generarPregunta();
  }

  generarPregunta() {
    if (this.intentos < this.maxIntentos) {
      this.pokemonService.getRandomPokemon().subscribe(p => {
        this.generarOpciones(p);
      });
    } else {
      this.juegoTerminado = true;
    }
  }
  

  generarOpciones(correctAnswer: any) {
    this.pokemonService.getPokemonOptions(3).subscribe(pokemons => {
      this.pokemon = correctAnswer;
      this.opciones = [correctAnswer.name];
      
      pokemons.forEach(p => {
        if (!this.opciones.includes(p.name)) {
          this.opciones.push(p.name);
        }
      });
    
      this.opciones.sort(() => Math.random() - 0.5);
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
      this.intentos++;
    }

    if (this.intentos < this.maxIntentos) {
      this.generarPregunta();
    } else {
      this.juegoTerminado = true;
      this.guardarPuntaje();
    }
  }

  reiniciarJuego() {
    this.puntaje = 0;
    this.intentos = 0;
    this.juegoTerminado = false;
    this.generarPregunta();
  }

  guardarPuntaje() {
    if (this.auth.usuario) {
      const puntuacion: Puntuacion = {
        email: this.auth.usuario.email,
        puntuacion: this.puntaje,
        fecha: new Date(),
        juego: 'preguntados'
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
