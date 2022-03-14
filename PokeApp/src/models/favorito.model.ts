import { Type } from "./pokemon.model";

export interface Favorito{
  name: string;
  alias: string;
  createAt: Date;
  img: string;
  types: Type[];
}
