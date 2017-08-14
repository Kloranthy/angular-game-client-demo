import { Vector3 } from './vector3';
import { Vector } from './vector';

export class Vector4
  extends Vector {

  public constructor() {
    super( 4 );

    this.setW( 1 );
  }

  // initialization
  public setFromValues(
    x: number,
    y: number,
    z: number,
    w: number
  ): Vector4 {
    this
      .setX( x )
      .setY( y )
      .setZ( z )
      .setW( w );

    return this;
  }

  public setFromVector3( vector: Vector3 ): Vector4 {
    const vComponents: number[] = vector.getComponents();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      this.components[ i ] = vComponents[ i ];
    }

    this.setW( 1 );

    return this;
  }

  // modification
  public setX( x: number ): Vector4 {
    this.setComponent( 0, x );

    return this;
  }

  public setY( y: number ): Vector4 {
    this.setComponent( 1, y );

    return this;
  }

  public setZ( z: number ): Vector4 {
    this.setComponent( 2, z );

    return this;
  }

  public setW( w: number ): Vector4 {
    this.setComponent( 3, w );

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

  public getW(): number {
    return this.components[ 3 ];
  }

  public clone(): Vector4 {
    const clone: Vector4 = new Vector4()
      .setFromVector( this );

    return clone;
  }
}
