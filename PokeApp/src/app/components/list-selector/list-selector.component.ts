import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListFavoritesPokemonComponent } from '../list-favorites-pokemon/list-favorites-pokemon.component';
import { ListPokemonComponent } from '../list-pokemon/list-pokemon.component';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.sass'],
})
export class ListSelectorComponent implements OnInit {
  constructor(private activateRouter: ActivatedRoute) {}

  ngOnInit(): void {}

  get isMainList() {
    return this.activateRouter.snapshot.component === ListPokemonComponent;
  }
  
  get isFavoriteList() {
    return this.activateRouter.snapshot.component === ListFavoritesPokemonComponent;
  }
}
