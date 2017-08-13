import { Vector } from './vector';

export class Vector2
  extends Vector {

  public constructor() {
    super( 2 );
  }

  // initialization
  public setX( x: number ): Vector2 {
    this.components[ 0 ] = x;

    return this;
  }

  public setY( y: number ): Vector2 {
    this.components[ 1 ] = y;

    return this;
  }

  // modification

  // products
  public getX(): number {
    return this.components[ 0 ];
  }

  public getY(): number {
    return this.components[ 1 ];
  }
}
