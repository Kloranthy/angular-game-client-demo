import { CoordinateSystem } from '../math/coordinate-system';
import { Vector3 } from '../math/vector3';
import { Matrix3 } from '../math/matrix3';
import { Matrix4 } from '../math/matrix4';

export class Transform {
  private coordinateSystem: CoordinateSystem;
  private transformationMatrix: Matrix4;

  public constructor() {
    this.transformationMatrix = new Matrix4();
  }

  // initialization
  public setCoordinateSystem( coordinateSystem: CoordinateSystem ): Transform {
    this.coordinateSystem = coordinateSystem;
    return this;
  }

  public setRotationFromMatrix( rotation: Matrix3 ): Transform {
    const mElements: number[][] = rotation.getElements();

    for (
      let ir = 0;
      ir < 3;
      ir++
    ) {
      for (
        let ic = 0;
        ic < 3;
        ic++
      ) {
        this.transformationMatrix.setElement(
          ir, ic,
          mElements[ ir ][ ic ]
        );
      }
    }

    return this;
  }

  // or was it translation?
  public setPositionFromVector( position: Vector3): Transform {
    const pComponents: number[] = position.getComponents();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      this.transformationMatrix.setElement(
        i, 3,
        pComponents[ i ]
      );
    }

    return this;
  }

  // set scale?

  // modification
  transferToCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    // todo: transform matrix
    this.coordinateSystem = coordinateSystem;
  }

  // lerp between

  // apply transformation

  // products
  public getRotationMatrix(): Matrix3 {
    const rotation: Matrix3 = new Matrix3();
    const elements: number[][] = this.transformationMatrix.getElements();

    for (
      let ir = 0;
      ir < 3;
      ir++
    ) {
      for (
        let ic = 0;
        ic < 3;
        ic++
      ) {
        rotation.setElement(
          ir, ic,
          elements[ ir ][ ic ]
        );
      }
    }

    return rotation;
  }

  public getPositionVector(): Vector3 {
    const position: Vector3 = new Vector3();
    const elements: number[][] = this.transformationMatrix.getElements();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      position.setComponent(
        i,
        elements[ i ][ 3 ]
      );
    }

    return position;
  }

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
