import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorito } from 'src/models/favorito.model';
import { Pokemon, PokemonCardModel, Type } from 'src/models/pokemon.model';
import Swal from 'sweetalert2';
import { ListFavoritesPokemonComponent } from '../list-favorites-pokemon/list-favorites-pokemon.component';

export type PokemonFavoriteEventModel = {
  name: string;
  value: boolean;
};

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.sass'],
})
export class CardPokemonComponent implements OnInit {
  @Input() pokemon: PokemonCardModel = {} as PokemonCardModel;
  favorite: Favorito[] = [];

  @Output() pokemonFavoriteStatusChanged =
    new EventEmitter<PokemonFavoriteEventModel>();

  get heartIcon() {
    const baseUrl = '../../../assets/icons/'
    const icon = this.pokemon.isFavorite ? "fill-heart.svg" : "heart.svg";
    return baseUrl + icon;
  }
  constructor(private activateRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  parseId(pokemonId: number) {
    return String(pokemonId).padStart(3, '0');
  }

  toogleFavorite() {
    console.log('toggle');
    const { pokemon } = this;
    !pokemon.isFavorite
      ? this.addFavorite(pokemon.name, pokemon.img, pokemon.types)
      : this.deletePokemon(pokemon.name);
  }

  addFavorite(name: string, img: string, types: Type[]) {
    this.pokemonFavoriteStatusChanged.emit({ name, value: true });
    const favorites = this.getFavoritesList();
    favorites.push({
      name,
      alias: name,
      createAt: new Date(),
      img: img,
      types: types,
    });
    if (this.isPokemonFavorite(name)) return;
    sessionStorage.setItem('favorite', JSON.stringify(favorites));
  }

  async deletePokemon(name: string) {
    const deleteConfirmed = await this.confirmDelete();
    if (!deleteConfirmed) return;
    const favorites = this.getFavoritesList();
    const pokemonFilters = favorites.filter((x: any) => x.name !== name);
    if (pokemonFilters) {
      this.pokemonFavoriteStatusChanged.emit({ name, value: false });
      sessionStorage.setItem('favorite', JSON.stringify(pokemonFilters));
    }
  }

  async confirmDelete(): Promise<boolean> {
    if (
      this.activateRouter.snapshot.routeConfig?.component !==
      ListFavoritesPokemonComponent
    )
      return true;

    const result = await Swal.fire({
      title: 'Estás seguro de querer eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    return result.isConfirmed;
  }

  getFavoritesList(): Favorito[] {
    const favoritesString = sessionStorage.getItem('favorite');
    if (!favoritesString) return [];
    return JSON.parse(favoritesString as string);
  }

  isPokemonFavorite(pokemonName: string) {
    const favoritesString = sessionStorage.getItem('favorite');
    if (!favoritesString) return false;
    const favorites = JSON.parse(favoritesString as string);
    return favorites.some((x: any) => x.name === pokemonName);
  }

  go(name: string){
    this.router.navigateByUrl(`edit/${name}`)
  }
}
