import { Component, Input, OnInit } from '@angular/core';
import { pokemonType } from 'src/helpers/pokemon';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.sass']
})
export class PokemonTypeComponent implements OnInit {
  @Input() type: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  get typeImg(): string {
    return pokemonType[this.type] ?? pokemonType.unknown;
  }

}
