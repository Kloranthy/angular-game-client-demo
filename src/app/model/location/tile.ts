import { Cell } from './cell';

export class Tile {

  private tileId: string;
  private cell: Cell;
  // todo have multiple sprites, retrieve based on view angle?
  // position in cell
  image: string;
  // todo proper entity-location interaction

  constructor() {}

  setTileId(tileId: string): Tile {
    this.tileId = tileId;
    return this;
  }

  getTileId(): string {
    return this.tileId;
  }
}
