import { Vector } from './vector';
import { Matrix3 } from './matrix3';
import { Vector4 } from './vector4';
import { Matrix4 } from './matrix4';

export class Vector3
  extends Vector {

  public constructor() {
    super( 3 );
  }

  // initialization
  public setFromValues(
    x: number,
    y: number,
    z: number
  ): Vector3 {
    this
      .setX( x )
      .setY( y )
      .setZ( z );

    return this;
  }

  public setX( x: number ): Vector3 {
    this.setComponent( 0, x );

    return this;
  }

  public setY( y: number ): Vector3 {
    this.setComponent( 1, y );

    return this;
  }

  public setZ( z: number ): Vector3 {
    this.setComponent( 2, z );

    return this;
  }

  // modification
  public applyMatrix3( matrix: Matrix3 ): Vector3 {
    this.applyMatrix( matrix );

    return this;
  }

  public applyMatrix4( matrix: Matrix4 ): Vector3 {
    const vector: Vector4 = new Vector4()
      .setFromVector3( this );

    vector.applyMatrix4( matrix );
    vector.multiplyScalar(
      1 / vector.getW()
    );

    this
      .setX( vector.getX() )
      .setY( vector.getY() )
      .setZ( vector.getZ() );

    return this;
  }

  // products
  public getX(): number {
    return this.components[ 0 ];
  }

  public getY(): number {
    return this.components[ 1 ];
  }

  public getZ(): number {
    return this.components[ 2 ];
  }

  public getCrossProduct( vector: Vector3 ): Vector3 {
    const vComponents: number[] = vector.getComponents();
    const crossProduct: Vector3 = new Vector3()
      .setX(
        this.components[ 1 ] * vComponents[ 2 ]
        - this.components[ 2 ] * vComponents[ 1 ]
      )
      .setY(
        this.components[ 2 ] * vComponents[ 0 ]
        - this.components[ 0 ] * vComponents[ 2 ]
      )
      .setZ(
        this.components[ 0 ] * vComponents[ 1 ]
        - this.components[ 1 ] * vComponents[ 0 ]
      );

    return crossProduct;
  }

  public clone(): Vector3 {
    const clone: Vector3 = new Vector3()
      .setFromVector( this );

    return clone;
  }
}
