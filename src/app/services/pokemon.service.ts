import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from '../clases/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs van de 1 a 898
    return this.http.get<Pokemon>(`${this.apiUrl}/${randomId}`);
  }

  getPokemonOptions(count: number): Observable<Pokemon[]> {
    const requests: Observable<Pokemon>[] = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.getRandomPokemon());
    }
    return forkJoin(requests);
  }
}
