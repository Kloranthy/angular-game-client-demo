
import { Matrix } from './matrix';
export class Matrix2
  extends Matrix {

  public constructor() {
    super( 2, 2 );
  }

  // initialization

  // modification

  // products
  public clone(): Matrix2 {
    const clone: Matrix2 = new Matrix2()
      .setFromMatrix( this );

    return clone;
  }
}
