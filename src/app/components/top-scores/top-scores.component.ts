import { Component, OnInit } from '@angular/core';
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from '@angular/fire/firestore';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

interface Score {
  email: string;
  fecha: string;
  juego: string;
  puntuacion: number;
}

@Component({
  selector: 'app-top-scores',
  templateUrl: './top-scores.component.html',
  styleUrls: ['./top-scores.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TopScoresComponent implements OnInit {
  juegos = ['preguntados', 'mayoromenor', 'sumayresta', 'ahorcado'];
  topScores: { [key: string]: Score[] } = {};

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getTopScores();
  }

  async getTopScores() {
    for (const juego of this.juegos) {
      const scores = await this.fetchTopScores(juego);
      this.topScores[juego] = scores;
    }
  }

  private async fetchTopScores(juego: string): Promise<Score[]> {
    const scoresCollection = collection(this.storageService.firestore, 'puntuaciones');
    const scoresQuery = query(scoresCollection, where('juego', '==', juego));
    const querySnapshot = await getDocs(scoresQuery);
  
    const scores: Score[] = querySnapshot.docs.map(doc => doc.data() as Score);
    
    return scores.sort((a, b) => b.puntuacion - a.puntuacion).slice(0, 3);
  }
  
  formatHora(hora: any): string {
    return hora instanceof Timestamp ? hora.toDate().toLocaleString() : "Error en la fecha";
  }
  
}
