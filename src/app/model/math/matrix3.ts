export class Matrix3 {

  private elements: number[][];

  public static multiplyMatrices(
    matrixA: Matrix3,
    matrixB: Matrix3
  ): Matrix3 {
    const matrixC: Matrix3 = new Matrix3();
    const a: number[][] = matrixA.getElements();
    const b: number[][] = matrixB.getElements();
    const c: number[][] = matrixC.getElements();

    c[ 0 ][ 0 ]
      = a[ 0 ][ 0 ] * b[ 0 ][ 0 ]
      + a[ 0 ][ 1 ] * b[ 1 ][ 0 ]
      + a[ 0 ][ 2 ] * b[ 2 ][ 0 ];
    c[ 0 ][ 1 ]
      = a[ 0 ][ 0 ] * b[ 0 ][ 1 ]
      + a[ 0 ][ 1 ] * b[ 1 ][ 1 ]
      + a[ 0 ][ 2 ] * b[ 2 ][ 1 ];
    c[ 0 ][ 2 ]
      = a[ 0 ][ 0 ] * b[ 0 ][ 2 ]
      + a[ 0 ][ 1 ] * b[ 1 ][ 2 ]
      + a[ 0 ][ 2 ] * b[ 2 ][ 2 ];

    c[ 1 ][ 0 ]
      = a[ 1 ][ 0 ] * b[ 0 ][ 0 ]
      + a[ 1 ][ 1 ] * b[ 1 ][ 0 ]
      + a[ 1 ][ 2 ] * b[ 2 ][ 0 ];
    c[ 1 ][ 1 ]
      = a[ 1 ][ 0 ] * b[ 0 ][ 1 ]
      + a[ 1 ][ 1 ] * b[ 1 ][ 1 ]
      + a[ 1 ][ 2 ] * b[ 2 ][ 1 ];
    c[ 1 ][ 2 ]
      = a[ 1 ][ 0 ] * b[ 0 ][ 2 ]
      + a[ 1 ][ 1 ] * b[ 1 ][ 2 ]
      + a[ 1 ][ 2 ] * b[ 2 ][ 2 ];

    c[ 2 ][ 0 ]
      = a[ 2 ][ 0 ] * b[ 0 ][ 0 ]
      + a[ 2 ][ 1 ] * b[ 1 ][ 0 ]
      + a[ 2 ][ 2 ] * b[ 2 ][ 0 ];
    c[ 2 ][ 1 ]
      = a[ 2 ][ 0 ] * b[ 0 ][ 1 ]
      + a[ 2 ][ 1 ] * b[ 1 ][ 1 ]
      + a[ 2 ][ 2 ] * b[ 2 ][ 1 ];
    c[ 2 ][ 2 ]
      = a[ 2 ][ 0 ] * b[ 0 ][ 2 ]
      + a[ 2 ][ 1 ] * b[ 1 ][ 2 ]
      + a[ 2 ][ 2 ] * b[ 2 ][ 2 ];

    return matrixC;
  }

  public constructor() {
    this.elements = [];
    for (
      let ir = 0;
      ir < 3;
      ir++
    ) {
      this.elements[ ir ] = [];
      for (
        let ic = 0;
        ic < 3;
        ic++
      ) {
        this.elements[ ir ][ ic ] = ic === ir
          ? 1
          : 0;
      }
    }
  }

  public setFromValues( values: number[][] ): Matrix3 {
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
        this.elements[ ir ][ ic ] = values[ ir ][ ic ];
      }
    }

    return this;
  }

  public setFromMatrix( matrix: Matrix3 ): Matrix3 {
    this.setFromValues( matrix.getElements() );
    return this;
  }

  public setElement(
    row: number,
    column: number,
    value: number
  ): Matrix3 {
    this.elements[ row ][ column ] = value;

    return this;
  }

  public getElements(): number[][] {
    return this.elements;
  }

  public getElement(
    row: number,
    column: number
  ): number {
    return this.elements[ row ][ column ];
  }

  public addScalar( scalar: number ): Matrix3 {
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
        this.elements[ ir ][ ic ] = this.elements[ ir ][ ic ] + scalar;
      }
    }

    return this;
  }

  public subtractScalar( scalar: number ): Matrix3 {
    this.addScalar( -scalar );

    return this;
  }

  public multiplyScalar( scalar: number ): Matrix3 {
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
        this.elements[ ir ][ ic ] = this.elements[ ir ][ ic ] * scalar;
      }
    }

    return this;
  }

  public divideScalar( scalar: number ): Matrix3 {
    this.multiplyScalar( 1 / scalar );

    return this;
  }

  public preMultiply( matrix: Matrix3 ) {

    this.setFromMatrix(
      Matrix3.multiplyMatrices(
        matrix,
        this
      )
    );

    return this;
  }

  public postMultiply( matrix: Matrix3 ) {
    this.setFromMatrix(
      Matrix3.multiplyMatrices(
        this,
        matrix
      )
    );

    return this;
  }

  public addMatrix( matrix: Matrix3 ): Matrix3 {
    const mElements: number[][] = matrix.getElements();

    this.elements[ 0 ][ 0 ] = this.elements[ 0 ][ 0 ] + mElements[ 0 ][ 0 ];
    this.elements[ 0 ][ 1 ] = this.elements[ 0 ][ 1 ] + mElements[ 0 ][ 1 ];
    this.elements[ 0 ][ 2 ] = this.elements[ 0 ][ 2 ] + mElements[ 0 ][ 2 ];

    this.elements[ 1 ][ 0 ] = this.elements[ 1 ][ 0 ] + mElements[ 1 ][ 0 ];
    this.elements[ 1 ][ 1 ] = this.elements[ 1 ][ 1 ] + mElements[ 1 ][ 1 ];
    this.elements[ 1 ][ 2 ] = this.elements[ 1 ][ 2 ] + mElements[ 1 ][ 2 ];

    this.elements[ 2 ][ 0 ] = this.elements[ 2 ][ 0 ] + mElements[ 2 ][ 0 ];
    this.elements[ 2 ][ 1 ] = this.elements[ 2 ][ 1 ] + mElements[ 2 ][ 1 ];
    this.elements[ 2 ][ 2 ] = this.elements[ 2 ][ 2 ] + mElements[ 2 ][ 2 ];

    return this;
  }

  public subtractMatrix( matrix: Matrix3 ): Matrix3 {
    const negativeMatrix: Matrix3 = matrix
      .clone()
      .multiplyScalar( -1 );

    this.addMatrix( negativeMatrix );

    return this;
  }

  public getTranspose(): Matrix3 {
    const transpose: Matrix3 = new Matrix3();
    const tElements: number[][] = transpose.getElements();

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
        tElements[ ir ][ ic ] = this.elements[ ic ][ ir ];
      }
    }

    return transpose;
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
