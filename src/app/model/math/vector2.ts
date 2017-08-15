import { Vector } from './vector';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Vector3 } from './vector3';

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
  public applyMatrix2( matrix: Matrix2 ): Vector2 {
    this.applyMatrix( matrix );

    return this;
  }

  public applyMatrix3( matrix: Matrix3 ): Vector2 {
    const vector: Vector3 = new Vector3(); // todo vector3 setFrom vector2
    vector
      .setX( this.getX() )
      .setY( this.getY() )
      .setZ( 1 );

    vector.applyMatrix3( matrix );

    vector.multiplyScalar(
      1 / vector.getZ()
    );

    this
      .setX( vector.getX() )
      .setY( vector.getY() );

    return this;
  }

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
