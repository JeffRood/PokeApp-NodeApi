export class PokemonHelpers {
  static cifrasSignificativas(num: number, places: number) {
    return String(num).padStart(places, '0');
  }

  static getParamsUrl(url: string, params: string) {
    const findParams = new URL(url);
    return findParams.searchParams.get(params);
  }
}

interface LooseObject {
  [key: string]: string
}

export const pokemonType: LooseObject | any = {
  normal: 'https://i.ibb.co/XJv0jVs/normal.png',
  fighting: 'https://i.ibb.co/Yhwj274/fighting.png',
  flying: 'https://i.ibb.co/Bngt68f/flying.png',
  poison: 'https://i.ibb.co/bgfQ5v5/poison.png',
  rock: 'https://i.ibb.co/Pr2RMXJ/rock.png',
  ground: 'https://i.ibb.co/HN62XRY/ground.png',
  bug: 'https://i.ibb.co/HPvXvMg/bug.png',
  ghost: 'https://i.ibb.co/cyppKSh/ghost.png',
  steel: 'https://i.ibb.co/VVJWQwP/steel.png',
  fire: 'https://i.ibb.co/hWWRF4P/fire.png',
  water: 'https://i.ibb.co/qpw9t3C/water.png',
  grass: 'https://i.ibb.co/MVM1Sft/grass.png',
  electric: 'https://i.ibb.co/3ygzPG5/electric.png',
  psychic: 'https://i.ibb.co/NSMLXpG/psychic.png',
  ice: 'https://i.ibb.co/CB6Xfr5/ice.png',
  dragon: 'https://i.ibb.co/QNthvNm/dragon.png',
  dark: 'https://i.ibb.co/DQk702T/dark.png',
  fairy: 'https://i.ibb.co/gZ4nvK3/fairy.png',
  unknown: 'unknown',
  shadow: 'shadow',
};