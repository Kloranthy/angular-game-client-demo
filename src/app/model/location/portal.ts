import { Transform } from './transform';

export class Portal {
  private entranceTransform: Transform;
  private exitTransform: Transform;
  // todo: convert height, width to rectangle, box, dimensions/bounds/geometry class
  private height: number;
  private width: number;
  private isTraversable: boolean; // windows, screens, etc are visible but not traversable

  public constructor() {}

  // initialization
  setEntranceTransform( transform: Transform ) {
    this.entranceTransform = transform;
  }

  setExitTransform( transform: Transform ) {
    this.exitTransform = transform;
  }

  setHeight( value: number ) {
    this.height = value;
  }

  setWidth( value: number ) {
    this.width = value;
  }

  setTraversable( isTraversable: boolean ) {
    this.isTraversable = isTraversable;
  }

  // modification
  // todo methods to change height, width, etc

  // products
  public getEntranceTransform(): Transform {
    const entranceTransform: Transform = this.entranceTransform.clone();

    return entranceTransform;
  }

  public getExitTransform(): Transform {
    const exitTransform: Transform = this.exitTransform.clone();

    return exitTransform;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getTraversable(): boolean {
    return this.isTraversable;
  }

  public traverse( transform: Transform ) {
    // transform * entrance.getInverse * exit
    // transform setCoordinateSystem exit.getCoordinateSystem
  }
}
