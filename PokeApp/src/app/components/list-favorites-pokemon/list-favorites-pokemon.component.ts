import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Favorito } from 'src/models/favorito.model';
import { Pokemon } from 'src/models/pokemon.model';
import { PokemonFavoriteEventModel } from '../card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-list-favorites-pokemon',
  templateUrl: './list-favorites-pokemon.component.html',
  styleUrls: ['./list-favorites-pokemon.component.sass'],
})
export class ListFavoritesPokemonComponent implements OnInit {
  pokemons: Pokemon[];
  offset: number = 0;
  limit: number = 15;

  constructor(private service: PokemonService) {
    this.pokemons = [] as Pokemon[];
  }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getNextPaginate() {
    this.offset += this.limit;
  }

  getPreviousPaginate() {
    this.offset -= this.limit;
  }

  getAllPokemon() {
    const favoritesString = sessionStorage.getItem('favorite');
    if (!favoritesString) return;

    const favorites = JSON.parse(favoritesString as string);
    this.pokemons = favorites.map((x: Favorito) => ({...x, isFavorite: true}))
  }

  changeFavoriteStatus(name: string, status: boolean) {
    const pokemon = this.pokemons.find((x) => x.name == name);
    if (pokemon) pokemon.isFavorite = status;
  }

  pokemonFavoriteStatusChange(event: PokemonFavoriteEventModel) {
    this.changeFavoriteStatus(event.name, event.value);
  }

  get pokemonList() {
    if (!this.pokemons) return [];
    return this.pokemons
      .sort((a, b) => a.id - b.id)
      .filter(x => x.isFavorite)
      .filter((_, idx) => {
        const position = idx + 1;
        return position > this.offset && position <= this.offset + this.limit;
      });
  }

  get hasPrev() {
    return !!this.offset;
  }

  get hasNext() {
    return this.pokemons.length > this.offset + this.limit;
  }
}
