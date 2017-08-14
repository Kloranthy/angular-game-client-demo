import { Vector } from './vector';

export class Vector2
  extends Vector {

  public constructor() {
    super( 2 );
  }

  // initialization
  public setFromValue(
    x: number,
    y: number
  ): Vector2 {
    this
      .setX( x )
      .setY( y );

    return this;
  }

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

  public clone(): Vector2 {
    const clone: Vector2 = new Vector2()
      .setFromVector( this );

    return clone;
  }
}
