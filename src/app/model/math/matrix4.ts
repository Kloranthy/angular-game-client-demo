import { Matrix } from './matrix';
import { Vector3 } from './vector3';
import { Matrix3 } from './matrix3';

export class Matrix4
  extends Matrix {

  public constructor() {
    super( 4, 4 );
  }

  // initialization
  public setRotationFromMatrix( rotation: Matrix3 ): Matrix4 {
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
        this.elements[ ir ][ ic ] = mElements[ ir ][ ic ];
      }
    }

    return this;
  }

  // or was it translation?
  public setPositionFromVector( position: Vector3): Matrix4 {
    for (
      let i = 0;
      i < 3;
      i++
    ) {
      this.elements[ i ][ 3 ] = position.getComponent( i );
    }

    return this;
  }

  // modification

  // products
  public getRotationMatrix(): Matrix3 {
    const rotation: Matrix3 = new Matrix3();

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
          this.elements[ ir ][ ic ]
        );
      }
    }

    return rotation;
  }

  public getPositionVector(): Vector3 {
    const position: Vector3 = new Vector3();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      position.setComponent(
        i,
        this.elements[ i ][ 3 ]
      );
    }

    return position;
  }
}
