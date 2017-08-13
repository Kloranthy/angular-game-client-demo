import { CoordinateSystem } from '../math/coordinate-system';

export class Cell {
  private cellId: string;
  private coordinateSystem: CoordinateSystem;
  // todo connection points and connections to other cells/coordinate systems
  private connectedCells;

  public constructor() {}


  public getCellId(): string {
    return this.cellId;
  }

  public setCellId( cellId: string ) {
    this.cellId = cellId;
  }

  public getCoordinateSystem(): CoordinateSystem {
    return this.coordinateSystem;
  }

  public setCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    this.coordinateSystem = coordinateSystem;
  }
}
