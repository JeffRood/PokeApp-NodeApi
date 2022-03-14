import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokemon, PokemonCardModel } from 'src/models/pokemon.model';
import { PokemonHelpers } from 'src/helpers/pokemon';
import { PaginationPokemon } from 'src/models/pokemonPagination.model';
import { PokemonFavoriteEventModel } from '../card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.sass'],
})
export class ListPokemonComponent implements OnInit {
  title = 'DemoFront';
  pokemons: Pokemon[];
  previous: string = '';
  next: string = '';

  constructor(private service: PokemonService) {
    this.pokemons = [] as Pokemon[];
  }

  ngOnInit() {
    this.getAllPokemon();
  }

  getNextPaginate() {
    if (!this.next) return;
    let offset = Number(PokemonHelpers.getParamsUrl(this.next, 'offset'));
    this.service
      .getPaginationPokemon(offset)
      .subscribe(this.handlePaginationResult);
  }

  getPreviousPaginate() {
    if (!this.previous) return;
    let offset = Number(PokemonHelpers.getParamsUrl(this.previous, 'offset'));
    this.service
      .getPaginationPokemon(offset)
      .subscribe(this.handlePaginationResult);
  }

  getAllPokemon() {
    this.service.getPaginationPokemon().subscribe(this.handlePaginationResult);
  }

  changeFavoriteStatus(name: string, status: boolean) {
    const pokemon = this.pokemons.find((x) => x.name == name);
    if (pokemon) pokemon.isFavorite = status;
    return pokemon;
  }

  handlePaginationResult = (pagination: PaginationPokemon) => {
    this.previous = pagination.previous;
    this.next = pagination.next;
    this.pokemons = [];
    pagination.results.forEach((result) => {
      this.service.getDetailsPokemon(result.name).subscribe((item) => {
        const img = this.service.getImagePokemon(item.id);
        const isFavorite = this.isPokemonFavorite(item.name);
        this.pokemons.push({ ...item, isFavorite, img });
      });
    });
  };

  isPokemonFavorite(pokemonName: string) {
    const favoritesString = sessionStorage.getItem('favorite');
    if (!favoritesString) return false;
    const favorites = JSON.parse(favoritesString as string);
    return favorites.some((x: any) => x.name === pokemonName);
  }

  pokemonFavoriteStatusChange(event: PokemonFavoriteEventModel) {
    this.changeFavoriteStatus(event.name, event.value);
  }

  get pokemonList() {
    if (!this.pokemons) return [];
    return this.pokemons.sort((a, b) => a.id - b.id);
  }

  get hasPrev() {
    return !!this.previous;
  }

  get hasNext() {
    return !!this.next;
  }
}
