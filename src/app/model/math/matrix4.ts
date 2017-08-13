import { Matrix } from './matrix';
import { Vector3 } from './vector3';
import { Matrix3 } from './matrix3';

export class Matrix4
  extends Matrix {

  public constructor() {
    super( 4, 4 );
  }

  public setRotation( matrix3: Matrix3 ): Matrix4 {
    const mElements: number[][] = matrix3.getElements();
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
  public setPosition( vector3: Vector3) {
    this.elements[ 0 ][ 3 ] = vector3.x;
    this.elements[ 1 ][ 3 ] = vector3.y;
    this.elements[ 2 ][ 3 ] = vector3.z;
  }

}
