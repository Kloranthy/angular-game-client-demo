import { Transform } from './transform';

/**
 * note: for finding the view frustum portal
 * get the point of the portal closest to the
 * camera. this will be a corner point on the
 * near plane of the portal view frustum.
 * made a diagram.
 */
export class Portal {
  private entranceTransform: Transform;
  private exitTransform: Transform;
  // todo: convert height, width to rectangle, box, dimensions/bounds/geometry class
  private height: number;
  private width: number;
  private isTraversable: boolean; // windows, screens, etc are visible but not traversable

  public constructor() {}

  // initialization
  public setEntranceTransform( transform: Transform ) {
    this.entranceTransform = transform;
  }

  public setExitTransform( transform: Transform ) {
    this.exitTransform = transform;
  }

  public setHeight( value: number ) {
    this.height = value;
  }

  public setWidth( value: number ) {
    this.width = value;
  }

  public setTraversable( isTraversable: boolean ) {
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
