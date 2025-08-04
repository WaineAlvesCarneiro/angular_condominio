import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImovelLista } from './imoveis/imovel-lista/imovel-lista';
import { ImovelForm } from './imoveis/imovel-form/imovel-form';

import { MoradorLista } from './moradores/morador-lista/morador-lista';
import { MoradorForm } from './moradores/morador-form/morador-form';

const routes: Routes = [
  { path: '', redirectTo: 'imoveis', pathMatch: 'full' },

  { path: 'imoveis', component: ImovelLista },
  { path: 'imoveis/novo', component: ImovelForm },
  { path: 'imoveis/:id', component: ImovelForm },

  { path: 'moradores', component: MoradorLista },
  { path: 'moradores/novo', component: MoradorForm },
  { path: 'moradores/:id', component: MoradorForm }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
