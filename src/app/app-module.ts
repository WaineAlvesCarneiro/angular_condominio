import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ImovelLista } from './imoveis/imovel-lista/imovel-lista';
import { ImovelForm } from './imoveis/imovel-form/imovel-form';
import { MoradorLista } from './moradores/morador-lista/morador-lista';
import { MoradorForm } from './moradores/morador-form/morador-form';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    App,
    ImovelLista,
    ImovelForm,
    MoradorLista,
    MoradorForm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [App]
})
export class AppModule { }
