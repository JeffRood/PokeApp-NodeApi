import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/models/pokemon.model';
import { PaginationPokemon } from 'src/models/pokemonPagination.model';
import { environment } from 'src/environments/environment';
import {PokemonHelpers} from 'src/helpers/pokemon'

const BASE_URL = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons:Pokemon;
  previus: string = ""
  netx: string = ""

  constructor(private http: HttpClient) {
    this.pokemons = {} as Pokemon
   }

  public getPaginationPokemon(offset:number = 0, limit:number = 15): Observable<PaginationPokemon>{

    const url = `${BASE_URL}?offset=${offset}&limit=${limit}`

    return this.http.get<PaginationPokemon>(url)

  }

  public getDetailsPokemon(name:string):Observable<Pokemon>{

    const url = `${BASE_URL}/${name}`

    return this.http.get<Pokemon>(url)
  }

  public getImagePokemon(id:number){
    let id_pokemon = PokemonHelpers.cifrasSignificativas(id,3)
    return `${environment.IMAGE_URL}${id_pokemon}.png`
  }

  public setSessionStorage(key: string, value: string){
    sessionStorage.setItem(key,value);
  }
}
