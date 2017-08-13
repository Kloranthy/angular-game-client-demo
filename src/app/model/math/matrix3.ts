import { Matrix } from 'app/model/math/matrix';

export class Matrix3 extends Matrix {

  public constructor() {
    super( 3, 3 );
  }

  public getDeterminant(): number {
    const determinant: number
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 1 ][ 1 ] * this.elements[ 2 ][ 2 ]
        - this.elements[ 1 ][ 2 ] * this.elements[ 2 ][ 1 ]
      )
      + this.elements[ 0 ][ 1 ] * (
          this.elements[ 1 ][ 0 ] * this.elements[ 2 ][ 2 ]
        - this.elements[ 1 ][ 2 ] * this.elements[ 2 ][ 0 ]
      )
      + this.elements[ 0 ][ 2 ] * (
          this.elements[ 1 ][ 0 ] * this.elements[ 2 ][ 1 ]
        - this.elements[ 1 ][ 1 ] * this.elements[ 2 ][ 0 ]
      );

    return determinant;
  }

  public getInverse(): Matrix3 {
    const minor: Matrix3 = this.getMatrixOfMinors();
    const mElements: number[][] = minor.getElements();

    const determinant: number
      = this.elements[ 0 ][ 0 ] * mElements[ 0 ][ 0 ]
      + this.elements[ 0 ][ 1 ] * mElements[ 0 ][ 1 ]
      + this.elements[ 0 ][ 2 ] * mElements[ 0 ][ 2 ];

    if ( determinant === 0 ) {
      return undefined;
    }

    // turn matrix of minors into matrix of cofactors
    mElements[ 0 ][ 1 ] = mElements[ 0 ][ 1 ] * -1;
    mElements[ 1 ][ 0 ] = mElements[ 1 ][ 0 ] * -1;
    mElements[ 1 ][ 2 ] = mElements[ 1 ][ 2 ] * -1;
    mElements[ 2 ][ 1 ] = mElements[ 2 ][ 1 ] * -1;

    // transpose the matrix of cofactors to get the adjugate/adjoint
    // and multiply that by 1 / determinant
    const inverse: Matrix3 = minor
      .getTranspose()
      .multiplyScalar( 1 / determinant );

    return inverse;
  }

  public equals( matrix: Matrix3 ): boolean {
    const mElements: number[][] = matrix.getElements();

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
        if ( this.elements[ ir ][ ic ] !== mElements[ ir ][ ic ] ) {
          return false;
        }
      }
    }

    return true;
  }

  public clone(): Matrix3 {
    const clone: Matrix3 = new Matrix3()
      .setFromMatrix( this );

    return clone;
  }

  private getMatrixOfMinors(): Matrix3 {
    const minor: Matrix3 = new Matrix3();
    const mElements: number[][] = minor.getElements();

    mElements[ 0 ][ 0 ]
      = this.elements[ 1 ][ 1 ] * this.elements[ 2 ][ 2 ]
      - this.elements[ 1 ][ 2 ] * this.elements[ 2 ][ 1 ];
    mElements[ 0 ][ 1 ]
      = this.elements[ 1 ][ 0 ] * this.elements[ 2 ][ 2 ]
      - this.elements[ 1 ][ 2 ] * this.elements[ 2 ][ 0 ];
    mElements[ 0 ][ 2 ]
      = this.elements[ 1 ][ 0 ] * this.elements[ 2 ][ 1 ]
      - this.elements[ 1 ][ 1 ] * this.elements[ 2 ][ 0 ];

    mElements[ 1 ][ 0 ]
      = this.elements[ 0 ][ 1 ] * this.elements[ 2 ][ 2 ]
      - this.elements[ 0 ][ 2 ] * this.elements[ 2 ][ 1 ];
    mElements[ 1 ][ 1 ]
      = this.elements[ 0 ][ 0 ] * this.elements[ 2 ][ 2 ]
      - this.elements[ 0 ][ 2 ] * this.elements[ 2 ][ 0 ];
    mElements[ 1 ][ 2 ]
      = this.elements[ 0 ][ 0 ] * this.elements[ 2 ][ 1 ]
      - this.elements[ 0 ][ 1 ] * this.elements[ 2 ][ 0 ];

    mElements[ 2 ][ 0 ]
      = this.elements[ 0 ][ 1 ] * this.elements[ 1 ][ 2 ]
      - this.elements[ 0 ][ 2 ] * this.elements[ 1 ][ 1 ];
    mElements[ 2 ][ 1 ]
      = this.elements[ 0 ][ 0 ] * this.elements[ 1 ][ 2 ]
      - this.elements[ 0 ][ 2 ] * this.elements[ 1 ][ 0 ];
    mElements[ 2 ][ 2 ]
      = this.elements[ 0 ][ 0 ] * this.elements[ 1 ][ 1 ]
      - this.elements[ 0 ][ 1 ] * this.elements[ 1 ][ 0 ];

    return minor;
  }
}
