
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
    rows <= 1
    ? this.rows = 2
    : this.rows = rows;
    columns <= 1
    ? this.columns = 2
    : this.columns = columns;

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

  public isSquare(): boolean {
    return this.rows === this.columns;
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

  public getTranspose(): Matrix {
    const transpose: Matrix = new Matrix(
      this.columns,
      this.rows
    );

    for (
      let itr = 0;
      itr < this.columns;
      itr ++
    ) {
      for (
        let itc = 0;
        itc < this.rows;
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
    if ( this.rows <= 1 ) {
      return undefined;
    }

    const cofactors: Matrix = new Matrix(
      this.rows,
      this.columns
    );

    let determinant: number;
    determinant = 0;

    for (
      let imc = 0;
      imc < cofactors.getColumns();
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
      imr < this.rows;
      imr++
    ) {
      for (
        let imc = 0;
        imc < this.columns;
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

  public clone() {
    const clone: Matrix = new Matrix(
      this.rows,
      this.columns
    ).setFromMatrix( this );

    return clone;
  }

  public equals( matrix: Matrix ) {
    if (
      this.getRows() !== matrix.getRows()
      || this.getColumns() !== matrix.getColumns()
    ) {
      return false;
    }

    const mElements: number[][] = matrix.getElements();

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
        if ( this.elements[ ir ][ ic ] !== mElements[ ir ][ ic ] ) {
          return false;
        }
      }
    }

    return true;
  }

  public getDeterminant(): number {
    if (
      this.rows !== this.columns
      || this.rows <= 1
      || this.columns <= 1
    ) {
      return undefined;
    }

    let determinant: number;

    if ( this.rows === 2 ) {
      determinant
        = this.elements[ 0 ][ 0 ] * this.elements[ 1 ][ 1 ]
        - this.elements[ 0 ][ 1 ] * this.elements[ 1 ][ 0 ];

      return determinant;
    }

    determinant = 0;

    for (
      let ic = 0;
      ic < this.columns;
      ic++
    ) {
      determinant = determinant
        + this.getCofactorFor( 0, ic );
    }

    return determinant;
  }

  protected getCofactorFor(
    row: number,
    column: number
  ): number {
    if ( this.rows <= 2 || this.columns <= 2 ) {
      return undefined;
    }
    if ( row >= this.rows || column >= this.columns ) {
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
    if ( row >= this.rows || column >= this.columns ) {
      // error
      return undefined;
    }

    const minor: Matrix = new Matrix(
      this.rows - 1,
      this.columns - 1
    );
    const mRows: number = minor.getRows();
    const mColumns: number = minor.getColumns();

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
