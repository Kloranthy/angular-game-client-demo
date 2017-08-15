import { Tile } from './tile';
import { Transform } from './transform';

export class Cell {
  private cellId: string;
  private transform: Transform;
  // todo connection points and connections to other cells/coordinate systems
  private connectedCells;
  private tiles: Tile[];

  public constructor() {}

  // initialization
  public setCellId( cellId: string ) {
    this.cellId = cellId;
  }

  // modification

  // products
  public getCellId(): string {
    return this.cellId;
  }
}
