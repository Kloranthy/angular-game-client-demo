import { Matrix } from 'app/model/math/matrix';

export class Matrix3
  extends Matrix {

  public constructor() {
    super( 3, 3 );
  }

  public clone(): Matrix3 {
    const clone: Matrix3 = new Matrix3()
      .setFromMatrix( this );

    return clone;
  }
}
