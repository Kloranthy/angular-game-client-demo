import { Matrix } from './matrix';
import { Vector3 } from './vector3';
import { Matrix3 } from './matrix3';

export class Matrix4 extends Matrix {

  public static multiplyMatrices(
    matrixA: Matrix4,
    matrixB: Matrix4
  ): Matrix4 {
    const matrixC: Matrix4 = new Matrix4();
    const a: number[][] = matrixA.getElements();
    const b: number[][] = matrixB.getElements();
    const c: number[][] = matrixC.getElements();

    c[ 0 ][ 0 ]
      = a[0][0] * b[0][0]
      + a[0][1] * b[1][0]
      + a[0][2] * b[2][0]
      + a[0][3] * b[3][0];
    c[ 0 ][ 1 ]
      = a[0][0] * b[0][1]
      + a[0][1] * b[1][1]
      + a[0][2] * b[2][1]
      + a[0][3] * b[3][1];
    c[ 0 ][ 2 ]
      = a[0][0] * b[0][2]
      + a[0][1] * b[1][2]
      + a[0][2] * b[2][2]
      + a[0][3] * b[3][2];
    c[ 0 ][ 3 ]
      = a[0][0] * b[0][3]
      + a[0][1] * b[1][3]
      + a[0][2] * b[2][3]
      + a[0][3] * b[3][3];

    c[ 1 ][ 0 ]
      = a[1][0] * b[0][0]
      + a[1][1] * b[1][0]
      + a[1][2] * b[2][0]
      + a[1][3] * b[3][0];
    c[ 1 ][ 1 ]
      = a[1][0] * b[0][1]
      + a[1][1] * b[1][1]
      + a[1][2] * b[2][1]
      + a[1][3] * b[3][1];
    c[ 1 ][ 2 ]
      = a[1][0] * b[0][2]
      + a[1][1] * b[1][2]
      + a[1][2] * b[2][2]
      + a[1][3] * b[3][2];
    c[ 1 ][ 3 ]
      = a[1][0] * b[0][3]
      + a[1][1] * b[1][3]
      + a[1][2] * b[2][3]
      + a[1][3] * b[3][3];

    c[ 2 ][ 0 ]
      = a[2][0] * b[0][0]
      + a[2][1] * b[1][0]
      + a[2][2] * b[2][0]
      + a[2][3] * b[3][0];
    c[ 2 ][ 1 ]
      = a[2][0] * b[0][1]
      + a[2][1] * b[1][1]
      + a[2][2] * b[2][1];
    c[ 2 ][ 2 ]
      = a[2][0] * b[0][2]
      + a[2][1] * b[1][2]
      + a[2][2] * b[2][2]
      + a[2][3] * b[3][2];
    c[ 2 ][ 3 ]
      = a[2][0] * b[0][3]
      + a[2][1] * b[1][3]
      + a[2][2] * b[2][3]
      + a[2][3] * b[3][3];

    c[ 3 ][ 0 ]
      = a[3][0] * b[0][0]
      + a[3][1] * b[1][0]
      + a[3][2] * b[2][0]
      + a[3][3] * b[3][0];
    c[ 3 ][ 1 ]
      = a[3][0] * b[0][1]
      + a[3][1] * b[1][1]
      + a[3][2] * b[2][1]
      + a[3][3] * b[3][1];
    c[ 3 ][ 2 ]
      = a[3][0] * b[0][2]
      + a[3][1] * b[1][2]
      + a[3][2] * b[2][2]
      + a[3][3] * b[3][2];
    c[ 3 ][ 3 ]
      = a[3][0] * b[0][3]
      + a[3][1] * b[1][3]
      + a[3][2] * b[2][3]
      + a[3][3] * b[3][3];

    return matrixC;
  }

  public constructor() {
    super( 4, 4 );
  }

  public setRotation( matrix3: Matrix3 ) {
    const mElements: number[][] = matrix3.getElements();
    this.elements[ 0 ][ 0 ] = mElements[ 0 ][ 0 ];
    this.elements[ 0 ][ 1 ] = mElements[ 0 ][ 1 ];
    this.elements[ 0 ][ 2 ] = mElements[ 0 ][ 2 ];


    this.elements[ 1 ][ 0 ] = mElements[ 1 ][ 0 ];
    this.elements[ 1 ][ 1 ] = mElements[ 1 ][ 1 ];
    this.elements[ 1 ][ 2 ] = mElements[ 1 ][ 2 ];

    this.elements[ 2 ][ 0 ] = mElements[ 2 ][ 0 ];
    this.elements[ 2 ][ 1 ] = mElements[ 2 ][ 1 ];
    this.elements[ 2 ][ 2 ] = mElements[ 2 ][ 2 ];
  }

  // or was it translation?
  public setPosition( vector3: Vector3) {
    this.elements[ 0 ][ 3 ] = vector3.x;
    this.elements[ 1 ][ 3 ] = vector3.y;
    this.elements[ 2 ][ 3 ] = vector3.z;
  }


  public addMatrix( matrix: Matrix4 ): Matrix4 {
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

  public subtractMatrix( matrix: Matrix4 ): Matrix4 {
    const negativeMatrix: Matrix4 = matrix
      .clone()
      .multiplyScalar( -1 );

    this.addMatrix( negativeMatrix );

    return this;
  }

  public getTranspose(): Matrix4 {
    const transpose: Matrix4 = new Matrix4();
    const tElements: number[][] = transpose.getElements();

    for (
      let ir = 0;
      ir < 4; // get rows to replace 4
      ir++
    ) {
      for (
        let ic = 0;
        ic < ir;
        ic++
      ) {
        tElements[ ir ][ ic ] = this.elements[ ic ][ ir ];
      }
    }

    return transpose;
  }

  public getDeterminant(): number {
    const a: number = this.elements[ 0 ][ 0 ];
    const b: number = this.elements[ 0 ][ 1 ];
    const c: number = this.elements[ 0 ][ 2 ];
    const d: number = this.elements[ 0 ][ 3 ];

    const e: number = this.elements[ 1 ][ 0 ];
    const f: number = this.elements[ 1 ][ 1 ];
    const g: number = this.elements[ 1 ][ 2 ];
    const h: number = this.elements[ 1 ][ 3 ];

    const i: number = this.elements[ 2 ][ 0 ];
    const j: number = this.elements[ 2 ][ 1 ];
    const k: number = this.elements[ 2 ][ 2 ];
    const l: number = this.elements[ 2 ][ 3 ];

    const m: number = this.elements[ 3 ][ 0 ];
    const n: number = this.elements[ 3 ][ 1 ];
    const o: number = this.elements[ 3 ][ 2 ];
    const p: number = this.elements[ 3 ][ 3 ];

    const determinate: number
      = a * (
          f * ( k + p - l - o )
        - g * ( j + p - l - n )
        + h * ( j + o - k - n )
      )
      - b * (
          e * ( k + p - l - o )
        - g * ( i + p - l - m )
        + h * ( i + o - k - m )
      )
      + c * (
          e * ( j + p - l - n )
        - f * ( i + p - l - m )
        + h * ( i + n - j - m )
      )
      - d * (
          e * ( j + o - k - n )
        - f * ( i + o - k - m )
        + g * ( i + n - j - m )
      );

    return determinate;
  }

  public getInverse(): Matrix4 {
    const minor: Matrix4 = this.getMatrixOfMinors();
    const mElements: number[][] = minor.getElements();

    const determinant
      = this.elements[ 0 ][ 0 ] * mElements[ 0 ][ 0 ]
      - this.elements[ 0 ][ 1 ] * mElements[ 0 ][ 1 ]
      + this.elements[ 0 ][ 2 ] * mElements[ 0 ][ 2 ]
      - this.elements[ 0 ][ 3 ] * mElements[ 0 ][ 3 ];

    if ( this.getDeterminant() === 0 ) {
      return undefined;
    }

    const inverse: Matrix4 = new Matrix4();

    // todo

    return inverse;
  }

  public equals( matrix: Matrix4 ): boolean {
    const mElements: number[][] = matrix.getElements();
    for (
      let ir = 0;
      ir < 4;
      ir ++
    ) {
      for (
        let ic = 0;
        ic < 4;
        ic++
      ) {
        if ( this.elements[ ir ][ ic ] !== mElements[ ir ][ ic ] ) {
          return false;
        }
      }
    }
    return true;
  }

  public clone(): Matrix4 {
    const clone: Matrix4 = new Matrix4()
      .setFromMatrix( this );
    return clone;
  }

  private getMatrixOfMinors(): Matrix4 {
    const minor: Matrix4 = new Matrix4();
    const mElements: number[][] = minor.getElements();

    /*
     [ 00 01 02 03 ]
     [ 10 11 12 13 ]
     [ 20 21 22 23 ]
     [ 30 31 32 33 ]
     */

    /*
     [ 11 12 13 ]
     [ 21 22 23 ]
     [ 31 32 33 ]
     */
    mElements[ 0 ][ 0 ]
      = this.elements[ 1 ][ 1 ] * (
          this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 2 ]
      )
      - this.elements[ 1 ][ 2 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 1 ]
      )
      + this.elements[ 1 ][ 3 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 1 ]
      );
    /*
     [ 10 12 13 ]
     [ 20 22 23 ]
     [ 30 32 33 ]
     */
    mElements[ 0 ][ 1 ]
      = this.elements[ 1 ][ 0 ] * (
          this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 2 ]
      )
      - this.elements[ 1 ][ 2 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 0 ]
      )
      + this.elements[ 1 ][ 3 ] * (
          this.elements[ 1 ][ 0 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 1 ][ 2 ] * this.elements[ 3 ][ 0 ]
      );
    /*
     [ 10 11 13 ]
     [ 20 21 23 ]
     [ 30 31 33 ]
     */
    mElements[ 0 ][ 2 ]
      = this.elements[ 1 ][ 0 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 1 ]
      )
      - this.elements[ 1 ][ 1 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 0 ]
      )
      + this.elements[ 1 ][ 3 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 1 ]
        - this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 0 ]
      );
    /*
     [ 10 11 12 ]
     [ 20 21 22 ]
     [ 30 31 32 ]
     */
    mElements[ 0 ][ 3 ]
      = this.elements[ 1 ][ 0 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 1 ]
      )
      - this.elements[ 1 ][ 1 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 0 ]
      )
      + this.elements[ 1 ][ 2 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 1 ]
        - this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 0 ]
      );

    /*
     [ 01 02 03 ]
     [ 21 22 23 ]
     [ 31 32 33 ]
     */
    mElements[ 1 ][ 0 ]
      = this.elements[ 0 ][ 1 ] * (
          this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 2 ]
      )
      - this.elements[ 0 ][ 2 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 1 ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[ 2 ][ 1 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 1 ]
      );
    /*
     [ 00 02 03 ]
     [ 20 22 23 ]
     [ 30 32 33 ]
     */
    mElements[ 1 ][ 1 ]
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 2 ]
      )
      - this.elements[ 0 ][ 2 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 2 ][ 3 ] * this.elements[ 3 ][ 0 ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][ 2 ]
        - this.elements[ 2 ][ 2 ] * this.elements[ 3 ][ 0 ]
      );
    /*
     [ 00 01 03 ]
     [ 20 21 23 ]
     [ 30 31 33 ]
     */
    mElements[ 1 ][ 2 ]
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 2 ][ 0 ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][ 0 ]
      )
      - this.elements[ 0 ][ 1 ] * (
          this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
      );
    /*
     [ 00 01 02 ]
     [ 20 21 22 ]
     [ 30 31 32 ]
     */
    mElements[ 1 ][ 3 ]
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
      )
      - this.elements[ 0 ][ 1 ] * (
          this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
      )
      + this.elements[ 0 ][ 2 ] * (
          this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 2 ][  ] * this.elements[ 3 ][  ]
      );

    /*
     [ 01 02 03 ]
     [ 11 12 13 ]
     [ 31 32 33 ]
     */
    mElements[ 2 ][ 0 ]
      = this.elements[ 0 ][ 1 ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[ 0 ][ 2 ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );
    /*
     [ 00 02 03 ]
     [ 10 12 13 ]
     [ 30 32 33 ]
     */
    mElements[ 2 ][ 1 ]
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 1 ][ 2 ] * this.elements[ 3 ][ 3 ]
        - this.elements[ 1 ][ 3 ] * this.elements[ 3 ][ 2 ]
      )
      - this.elements[ 0 ][ 2 ] * (
          this.elements[ 1 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 1 ][  ] * this.elements[ 3 ][  ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[ 1 ][  ] * this.elements[ 3 ][  ]
        - this.elements[ 1 ][  ] * this.elements[ 3 ][  ]
      );
    /*
     [ 00 01 03 ]
     [ 10 11 13 ]
     [ 30 31 33 ]
     */
    mElements[ 2 ][ 2 ]
      = this.elements[ 0 ][ 0 ] * (
          this.elements[ 1 ][  ] * this.elements[  ][  ]
        - this.elements[ 1 ][  ] * this.elements[  ][  ]
      )
      - this.elements[ 0 ][ 1 ] * (
          this.elements[ 1 ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[ 0 ][ 3 ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );
    /*
     [ 00 01 02 ]
     [ 10 11 12 ]
     [ 30 31 32 ]
     */
    mElements[ 2 ][ 3 ]
      = this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );

    /*
     [ 01 02 03 ]
     [ 11 12 13 ]
     [ 21 22 23 ]
     */
    mElements[ 3 ][ 0 ]
      = this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );
    /*
     [ 00 02 03 ]
     [ 10 12 13 ]
     [ 20 22 23 ]
     */
    mElements[ 3 ][ 1 ]
      = this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );
    /*
     [ 00 01 03 ]
     [ 10 11 13 ]
     [ 20 21 23 ]
     */
    mElements[ 3 ][ 2 ]
      = this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );
    /*
     [ 00 01 02 ]
     [ 10 11 12 ]
     [ 20 21 22 ]
     */
    mElements[ 3 ][ 3 ]
      = this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      - this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      )
      + this.elements[  ][  ] * (
          this.elements[  ][  ] * this.elements[  ][  ]
        - this.elements[  ][  ] * this.elements[  ][  ]
      );

    return minor;
  }
}
