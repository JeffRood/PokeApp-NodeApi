import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsPokemonComponent } from './components/forms-pokemon/forms-pokemon.component';
import { ListFavoritesPokemonComponent } from './components/list-favorites-pokemon/list-favorites-pokemon.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: ListFavoritesPokemonComponent,
  },
  {
    path: 'edit/:name',
    component: FormsPokemonComponent,
  },
  {
    path: '',
    component: ListPokemonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
