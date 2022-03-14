import { Component, OnInit } from '@angular/core';
import { Favorito } from 'src/models/favorito.model';
import { ActivatedRoute } from '@angular/router';
import { AlertHelpers } from 'src/helpers/alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-pokemon',
  templateUrl: './forms-pokemon.component.html',
  styleUrls: ['./forms-pokemon.component.sass']
})
export class FormsPokemonComponent implements OnInit {

  pokemon: Favorito;

  constructor(private activateRouter: ActivatedRoute, private router: Router) {
    this.pokemon = {} as Favorito
   }

  ngOnInit(): void {
    if(!this.getFavoriteData()) this.go("/favorites")
     this.getFavoriteData()
  }


  getFavoriteData(){
    const favoritesString = sessionStorage.getItem('favorite');
    const favorites = JSON.parse(favoritesString as string);
    let dataPokemon = favorites.find((x: any) => x.name == this.activateRouter.snapshot.params['name']);
    this.pokemon = dataPokemon
    return this.pokemon
  }

  updateFavoritePokemon(pokemon: Favorito) {
    if (!pokemon.alias){
      AlertHelpers.FaildAlert("El campo alias tiene que ser valido")
      return
    }
    let dataPokemon = this.deletePokemon(pokemon)
    dataPokemon.push(pokemon)
    sessionStorage.setItem('favorite', JSON.stringify(dataPokemon))
    AlertHelpers.sucessAlert('Alias modificado exitosamente!!')
    this.go("/favorites")


  }

  deletePokemon(pokemon: Favorito){
    const favoritesString = sessionStorage.getItem('favorite');
    const favorites = JSON.parse(favoritesString as string);
    let dataPokemon = favorites.filter((x: any) => x.name != pokemon.name);
    sessionStorage.setItem('favorite', JSON.stringify(dataPokemon))
    return dataPokemon
  }

  go(router: string){
    this.router.navigateByUrl(router)
  }

}
