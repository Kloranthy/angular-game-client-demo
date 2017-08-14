import { CoordinateSystem } from '../math/coordinate-system';
import { Vector3 } from '../math/vector3';
import { Matrix3 } from '../math/matrix3';

export class Transform {
  private coordinateSystem: CoordinateSystem;
  private position: Vector3;
  private rotation: Matrix3;
  // or should I use matrix4?

  public constructor() {}

  // initialization
  public setCoordinateSystem( coordinateSystem: CoordinateSystem ): Transform {
    this.coordinateSystem = coordinateSystem;
    return this;
  }

  public setRotation( rotation: Matrix3 ) {}

  // modification
  transferToCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    // todo: transform matrix
    this.coordinateSystem = coordinateSystem;
  }

  // products
  getPositionRelativeToCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    // if ( this.coordinateSystem.hasConnectionTo( coordinateSystem ) ) {
    //   const clone: Transform = this.clone();
    //   clone.transferToCoordinateSystem( coordinateSystem );
    //   return clone;
    // }
  }

  clone(): Transform {
    const clone: Transform = new Transform();
    clone.setCoordinateSystem( this.coordinateSystem );
    // todo set matrix/vector too
    return clone;
  }
}
