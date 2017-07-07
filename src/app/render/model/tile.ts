import { Wall } from './wall';

export class Tile {
  tileId: string;
  // todo have multiple sprites, retrieve based on view angle
  image: string;
  // todo proper entity-location interaction
  wall: Wall;

  constructor() {
    //console.log('Tile enter constructor');
    //console.log('Tile exit constructor');
  }

  getTileId(): string {
    console.log('Tile enter getTileId');
    console.log('tileId: ' + this.tileId);
    console.log('Tile exit getTileId');
    return this.tileId;
  }

  setTileId(tileId: string): void {
    console.log('Tile enter setTileId');
    this.tileId = tileId;
    console.log('tileId: ' + this.tileId);
    console.log('Tile exit getTileId');
  }
}
