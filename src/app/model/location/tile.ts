import { Cell } from './cell';
import { Transform } from './transform';

export class Tile {

  private tileId: string;
  private cell: Cell;
  // todo have multiple sprites, retrieve based on view angle?
  private transform: Transform;
  image: string;
  // todo proper entity-location interaction

  constructor() {}

  // initialization
  setTileId(tileId: string): Tile {
    this.tileId = tileId;
    return this;
  }

  // modification

  // products
  getTileId(): string {
    return this.tileId;
  }
}
