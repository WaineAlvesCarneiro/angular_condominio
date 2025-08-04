import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ImovelLista } from './imoveis/imovel-lista/imovel-lista';
import { ImovelForm } from './imoveis/imovel-form/imovel-form';
import { MoradorLista } from './moradores/morador-lista/morador-lista';
import { MoradorForm } from './moradores/morador-form/morador-form';

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
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
