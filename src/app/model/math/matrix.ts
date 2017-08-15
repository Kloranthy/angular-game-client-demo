/**
 * debating whether to add row and column operations
 * ( add, remove, multiply, etc )
 */
export class Matrix {
  protected numberOfRows: number;
  protected numberOfColumns: number;
  protected elements: number[][];

  public static multiplyMatrices(
    matrixA: Matrix,
    matrixB: Matrix
  ): Matrix {
    const mBRows: number = matrixB.getNumberOfRows();
    const mAColumns: number = matrixA.getNumberOfColumns();

    if ( mAColumns !== mBRows ) {
      return undefined;
    }

    const mARows: number = matrixA.getNumberOfRows();
    const mBColumns: number = matrixB.getNumberOfColumns();

    const matrixC: Matrix = new Matrix(
      mARows,
      mBColumns
    );

    const aElements: number[][] = matrixA.getElements();
    const bElements: number[][] = matrixB.getElements();

    for (
      let icr = 0;
      icr < mARows;
      icr++
    ) {

      for (
        let icc = 0;
        icc < mBColumns;
        icc++
      ) {
        let cElementSum: number;

        cElementSum = 0;

        for (
          let iac = 0;
          iac < mAColumns;
          iac++
        ) {
          cElementSum = cElementSum
            + aElements[ icr ][ iac ] * bElements[ iac ][ icc ];
        }

        matrixC.setElement(
          icr, icc,
          cElementSum
        );
      }
    }

    return matrixC;
  }

  public constructor(
    rows: number,
    columns: number
  ) {
    rows <= 1
    ? this.numberOfRows = 2
    : this.numberOfRows = rows;
    columns <= 1
    ? this.numberOfColumns = 2
    : this.numberOfColumns = columns;

    this.elements = [];

    for (
      let ir = 0;
      ir < this.numberOfRows;
      ir++
    ) {
      this.elements[ir] = [];

      for (
        let ic = 0;
        ic < this.numberOfColumns;
        ic++
      ) {
        ir === ic
        ? this.elements[ir][ic] = 1
        : this.elements[ir][ic] = 0;
      }
    }
  }

  // initialization methods
  public setFromMatrix( matrix: Matrix ): Matrix {
    this.setFromElements(
      matrix.getElements()
    );

    return this;
  }

  public setFromElements( elements: number[][] ) {
    this.elements = [];
    this.numberOfRows = this.elements.length;
    this.numberOfColumns = this.elements[ 0 ].length;

    for (
      let ir = 0;
      ir < this.numberOfRows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < this.numberOfColumns;
        ic++
      ) {
        this.elements[ ir ][ ic ] = elements[ ir ][ ic ]
      }
    }

    return this;
  }

  // modification methods
  public setElement(
    row: number,
    column: number,
    value: number
  ): Matrix {
    this.elements[ row ][ column ] = value;

    return this;
  }

  public addScalar( scalar: number ): Matrix {
    for (
      let ir = 0;
      ir < this.numberOfRows;
      ir ++
    ) {
      for (
        let ic = 0;
        ic < this.numberOfColumns;
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
    const mRows: number = matrix.getNumberOfRows();
    const mColumns: number = matrix.getNumberOfColumns();

    if (
      this.numberOfRows !== mRows
      || this.numberOfColumns !== mColumns
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
      ir < this.numberOfRows;
      ir ++
    ) {
      for (
        let ic = 0;
        ic < this.numberOfColumns;
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

  // products
  public getNumberOfRows(): number {
    return this.numberOfRows;
  }

  public getNumberOfColumns(): number {
    return this.numberOfColumns;
  }

  public isSquare(): boolean {
    return this.numberOfRows === this.numberOfColumns;
  }

  public getElements(): number[][] {
    const elements: number[][] = [];
    for (
      let ir = 0;
      ir < this.numberOfRows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < this.numberOfColumns;
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

  public getTranspose(): Matrix {
    const transpose: Matrix = new Matrix(
      this.numberOfColumns,
      this.numberOfRows
    );

    for (
      let itr = 0;
      itr < this.numberOfColumns;
      itr ++
    ) {
      for (
        let itc = 0;
        itc < this.numberOfRows;
        itc++
      ) {
        transpose.setElement(
          itc, itr,
          this.elements[ itr ][ itc ]
        );
      }
    }

    return transpose;
  }

  public getInverse(): Matrix {
    if ( !this.isSquare() ) {
      return undefined;
    }
    if ( this.numberOfRows <= 1 ) {
      return undefined;
    }

    const cofactors: Matrix = new Matrix(
      this.numberOfRows,
      this.numberOfColumns
    );

    let determinant: number;
    determinant = 0;

    for (
      let imc = 0;
      imc < cofactors.getNumberOfColumns();
      imc++
    ) {
      cofactors.setElement(
        0, imc,
        this.getCofactorFor(
          0, imc
        )
      );
      determinant = determinant
        + cofactors.getElement( 0, imc );
    }

    if ( determinant === 0 ) {
      return undefined;
    }

    for (
      let imr = 1;
      imr < this.numberOfRows;
      imr++
    ) {
      for (
        let imc = 0;
        imc < this.numberOfColumns;
        imc++
      ) {
        cofactors.setElement(
          imr, imc,
          this.getCofactorFor(
            imr, imc
          )
        );
      }
    }

    const inverse: Matrix = cofactors
      .getTranspose()
      .multiplyScalar( 1 / determinant );

    return inverse;
  }

  public getDeterminant(): number {
    if (
      this.numberOfRows !== this.numberOfColumns
      || this.numberOfRows <= 1
      || this.numberOfColumns <= 1
    ) {
      return undefined;
    }

    let determinant: number;

    if ( this.numberOfRows === 2 ) {
      determinant
        = this.elements[ 0 ][ 0 ] * this.elements[ 1 ][ 1 ]
        - this.elements[ 0 ][ 1 ] * this.elements[ 1 ][ 0 ];

      return determinant;
    }

    determinant = 0;

    for (
      let ic = 0;
      ic < this.numberOfColumns;
      ic++
    ) {
      determinant = determinant
        + this.getCofactorFor( 0, ic );
    }

    return determinant;
  }

  public clone() {
    const clone: Matrix = new Matrix(
      this.numberOfRows,
      this.numberOfColumns
    ).setFromMatrix( this );

    return clone;
  }

  public equals( matrix: Matrix ) {
    if (
      this.getNumberOfRows() !== matrix.getNumberOfRows()
      || this.getNumberOfColumns() !== matrix.getNumberOfColumns()
    ) {
      return false;
    }

    const mElements: number[][] = matrix.getElements();

    for (
      let ir = 0;
      ir < this.numberOfRows;
      ir++
    ) {
      for (
        let ic = 0;
        ic < this.numberOfColumns;
        ic++
      ) {
        if ( this.elements[ ir ][ ic ] !== mElements[ ir ][ ic ] ) {
          return false;
        }
      }
    }

    return true;
  }

  protected getCofactorFor(
    row: number,
    column: number
  ): number {
    if ( this.numberOfRows <= 2 || this.numberOfColumns <= 2 ) {
      return undefined;
    }
    if ( row >= this.numberOfRows || column >= this.numberOfColumns ) {
      // error
      return undefined;
    }

    const minor: Matrix = this.getMinorMatrixFor( row, column );
    const determinant: number = minor.getDeterminant();
    const sign: number = Math.pow(
      -1,
      row + column
    );
    const cofactor: number = sign * determinant;

    return cofactor;
  }

  protected getMinorMatrixFor(
    row: number,
    column: number
  ): Matrix {
    if ( row >= this.numberOfRows || column >= this.numberOfColumns ) {
      // error
      return undefined;
    }

    const minor: Matrix = new Matrix(
      this.numberOfRows - 1,
      this.numberOfColumns - 1
    );
    const mRows: number = minor.getNumberOfRows();
    const mColumns: number = minor.getNumberOfColumns();

    for (
      let imr = 0;
      imr < mRows;
      imr++
    ) {
      for (
        let imc = 0;
        imc < mColumns;
        imc++
      ) {
        let r: number;
        let c: number;

        imr >= row
          ? r = imr + 1
          : r = imr;

        imc >= column
          ? c = imc + 1
          : c = imc;

        minor.setElement(
          imr, imc,
          this.elements[ r ][ c ]
        )
      }
    }

    return minor;
  }
}
