import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsPokemonComponent } from './components/forms-pokemon/forms-pokemon.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { ListFavoritesPokemonComponent } from './components/list-favorites-pokemon/list-favorites-pokemon.component';
import { FormsModule } from '@angular/forms';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { ListSelectorComponent } from './components/list-selector/list-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsPokemonComponent,
    ListPokemonComponent,
    CardPokemonComponent,
    ListFavoritesPokemonComponent,
    PokemonTypeComponent,
    ListSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
