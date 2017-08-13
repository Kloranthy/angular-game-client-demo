import { element } from 'protractor';
export class Matrix {
  protected rows: number;
  protected columns: number;
  protected elements: number[][];

  public static multiplyMatrices(
    matrixA: Matrix,
    matrixB: Matrix
  ): Matrix {
    const mBRows: number = matrixB.getRows();
    const mAColumns: number = matrixA.getColumns();

    if ( mAColumns !== mBRows ) {
      return undefined;
    }

    const mARows: number = matrixA.getRows();
    const mBColumns: number = matrixB.getColumns();

    const matrixC: Matrix = new Matrix(
      mARows,
      mBColumns
    );

    const aElements: number[][] = matrixA.getElements();
    const bElements: number[][] = matrixB.getElements();
    const cElements: number[][] = matrixC.getElements();

    for (
      let icr = 0;
      icr < mARows;
      icr++
    ) {
      cElements[ icr ] = [];

      for (
        let icc = 0;
        icc < mBColumns;
        icc++
      ) {
        cElements[ icr ][ icc ] = 0;

        for (
          let iac = 0;
          iac < mAColumns;
          iac++
        ) {
          cElements[ icr ][ icc ] = cElements[ icr ][ icc ]
            + aElements[ icr ][ iac ] * bElements[ iac ][ icc ];
        }
      }
    }

    matrixC.setFromElements( cElements );

    return matrixC;
  }

  public constructor(
    rows: number,
    columns: number
  ) {
    this.rows = rows;
    this.columns = columns;
    this.elements = [];

    for (
      let ir = 0;
      ir < this.rows;
      ir++
    ) {
      this.elements[ir] = [];

      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        ir === ic
        ? this.elements[ir][ic] = 1
        : this.elements[ir][ic] = 0;
      }
    }
  }

  public getRows(): number {
    return this.rows;
  }

  public getColumns(): number {
    return this.columns;
  }

  public setFromMatrix( matrix: Matrix ): Matrix {
    this.setFromElements(
      matrix.getElements()
    );

    return this;
  }


  public setFromElements( elements: number[][] ) {
    this.elements = [];
    this.rows = this.elements.length;
    this.columns = this.elements[ 0 ].length;

    for (
      let ir = 0;
      ir < this.rows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        this.elements[ ir ][ ic ] = elements[ ir ][ ic ]
      }
    }

    return this;
  }

  public setElement(
    row: number,
    column: number,
    value: number
  ): Matrix {
    this.elements[ row ][ column ] = value;

    return this;
  }

  public getElements(): number[][] {
    const elements: number[][] = [];
    for (
      let ir = 0;
      ir < this.rows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        elements[ ir ][ ic ] = this.elements[ ir ][ ic ];
      }
    }
    return elements;
  }

  public getElement(
    row: number,
    column: number
  ) {
    return this.elements[ row ][ column ];
  }

  public addScalar( scalar: number ): Matrix {
    for (
      let ir = 0;
      ir < this.rows;
      ir ++
    ) {
      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        this.elements[ ir ][ ic ] = this.elements[ ir ][ ic ] + scalar;
      }
    }

    return this;
  }

  public subtractScalar( scalar: number ): Matrix {
    this.addScalar( -scalar );

    return this;
  }

  public addMatrix( matrix: Matrix ): Matrix {
    const mElements: number[][] = matrix.getElements();
    const mRows: number = matrix.getRows();
    const mColumns: number = matrix.getColumns();

    if (
      this.rows !== mRows
      || this.columns !== mColumns
    ) {
      return this;
    }

    for (
      let ir = 0;
      ir < mRows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < mColumns;
        ic++
      ) {
        this.elements[ ir ][ ic ] = this.elements[ ir ][ ic ]
          + mElements[ ir ][ ic ];
      }
    }

    return this;
  }

  public subtractMatrix( matrix: Matrix ): Matrix {
    const negativeMatrix: Matrix = matrix
      .clone()
      .multiplyScalar( -1 );

    this.addMatrix( negativeMatrix );

    return this;
  }

  public multiplyScalar( scalar: number ) {
    for (
      let ir = 0;
      ir < this.rows;
      ir ++
    ) {
      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        this.elements[ ir ][ ic ] = this.elements[ ir ][ ic ] * scalar;
      }
    }

    return this;
  }

  public preMultiplyMatrix( matrix: Matrix ) {
    this.setFromMatrix(
      Matrix.multiplyMatrices( this, matrix )
    );

    return this;
  }
  public postMultiplyMatrix( matrix: Matrix ) {
    this.setFromMatrix(
      Matrix.multiplyMatrices( matrix, this )
    );

    return this;
  }

  // determinate

  // transpose
  getTranspose() {
    if ( this.rows !== this.columns ) {
      return
    }
    const transpose: Matrix = new Matrix(
      this.rows,
      this.columns
    );
    const tElements: number[][] = transpose.getElements();

    for (
      let ir = 0;
      ir < this.rows;
      ir ++
    ) {
      tElements[ ir ] = [];

      for (
        let ic = 0;
        ic < this.columns;
        ic++
      ) {
        tElements[ ir ][ ic ] = this.elements[ ic ][ ir ];
      }
    }

    transpose.setElements( tElements );

    return this;
  }

  // inverse

  // matrix of minors, cofactors

  // clone, equals
  clone() {
    const clone: Matrix = new Matrix(
      this.rows,
      this.columns
    ).setFromMatrix( this );

    return clone;
  }

}
