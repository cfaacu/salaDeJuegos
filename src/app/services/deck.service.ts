import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface Carta {
  value: string;
  suit: string;
  image: string;
}

interface Deck {
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deckId: string | null = null;

  constructor(private http: HttpClient) { }

  crearMazo(): Observable<Deck> {
    return this.http.get<Deck>('https://deckofcardsapi.com/api/deck/new/shuffle/').pipe(
      tap(deck => {
        console.log('Mazo creado:', deck);
      })
    );
  }
  

  sacarCarta(): Observable<{ cards: Carta[] }> {
    if (!this.deckId) {
      throw new Error('No hay mazo creado. Llama a crearMazo primero.');
    }
    return this.http.get<{ cards: Carta[] }>(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
  }

  setDeckId(deckId: string): void {
    this.deckId = deckId;
  }
}
