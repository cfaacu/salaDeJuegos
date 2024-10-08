import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayoromenorComponent } from './mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { DeckService } from '../../services/deck.service';
import { SumayrestaComponent } from './sumayresta/sumayresta.component';

const routes: Routes = [
  {
    path: "ahorcado",
    component: AhorcadoComponent
  },
  {
    path: "mayoromenor",
    component: MayoromenorComponent
  },
  {
    path: "preguntados",
    component: PreguntadosComponent
  },
  {
    path: "sumayresta",
    component: SumayrestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DeckService]
})
export class JuegosRoutingModule { }
