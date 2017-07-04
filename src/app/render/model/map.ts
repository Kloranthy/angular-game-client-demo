import { Tile } from './tile';

export class Map {
  tiles: Tile[][];

  constructor() {
    this.tiles = new Tile[32][32];
  }
}
