import { CoordinateSystem } from '../math/coordinate-system';
import { Tile } from './tile';

export class Cell {
  private cellId: string;
  private coordinateSystem: CoordinateSystem;
  // todo connection points and connections to other cells/coordinate systems
  private connectedCells;
  private tiles: Tile[];

  public constructor() {}

  // initialization
  public setCellId( cellId: string ) {
    this.cellId = cellId;
  }

  public setCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    this.coordinateSystem = coordinateSystem;
  }

  // modification

  // products
  public getCellId(): string {
    return this.cellId;
  }

  public getCoordinateSystem(): CoordinateSystem {
    return this.coordinateSystem;
  }
}
