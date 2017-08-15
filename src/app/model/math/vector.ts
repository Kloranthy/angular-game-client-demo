
import { Matrix } from './matrix';
export class Vector {
  protected numberOfComponents: number;
  protected components: number[];

  public constructor( numberOfComponents: number ) {
    numberOfComponents > 1
    ? this.numberOfComponents = numberOfComponents
    : this.numberOfComponents = 2;

    this.components = [];

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      this.components[ i ] = 0;
    }
  }

  // initialization
  public setFromVector( vector: Vector ) {
    this.setFromComponents(
      vector.getComponents()
    );

    return this;
  }

  public setFromComponents( components: number[] ): Vector {
    this.numberOfComponents = components.length;
    this.components = [];

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      this.components[ i ] = components[ i ];
    }

    return this;
  }

  // modification
  public setComponent(
    index: number,
    value: number
  ): Vector {
    if ( index >= this.numberOfComponents ) {
      return this;
    }
    this.components[ index ] = value;

    return this;
  }

  public addScalar( scalar: number ): Vector {
    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      this.components[ i ] = this.components[ i ] + scalar;
    }

    return this;
  }

  public subtractScalar( scalar: number ): Vector {
    this.addScalar( -scalar );

    return this;
  }

  public multiplyScalar( scalar: number ): Vector {
    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      this.components[ i ] = this.components[ i ] * scalar;
    }

    return this;
  }

  public addVector( vector: Vector ): Vector {
    if ( vector.getNumberOfComponents() !== this.numberOfComponents ) {
      return undefined;
    }

    const vComponents: number[] = vector.getComponents();

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      this.components[ i ] = this.components[ i ] + vComponents[ i ];
    }

    return this;
  }

  public subtractVector( vector: Vector ): Vector {
    if ( vector.getNumberOfComponents() !== this.numberOfComponents ) {
      return undefined;
    }

    const negativeVector: Vector = vector
      .clone();

    vector.multiplyScalar( -1 );

    this.addVector( negativeVector );

    return this;
  }

  public applyMatrix( matrix: Matrix ): Vector {
    if ( matrix.getNumberOfColumns() !== this.numberOfComponents ) {
      return undefined;
    }
    const mElements = matrix.getElements();
    const vComponents = this.getComponents();

    for (
      let ic = 0;
      ic < matrix.getNumberOfColumns();
      ic++
    ) {
      let componentSum: number;

      componentSum = 0;

      for (
        let ir = 0;
        ir < matrix.getNumberOfRows();
        ir++
      ) {
        componentSum = componentSum
          + mElements[ ir ][ ic ] * vComponents[ ic ]
      }

      this.setComponent( ic, componentSum );
    }

    return this;
  }

  public normalize(): Vector {
    const length: number = this.getLength();

    if ( length === 1 || length === 0 ) {
      return this;
    }

    this.multiplyScalar( 1 / length );

    return this;
  }

  // products
  public getNumberOfComponents(): number {
    return this.numberOfComponents;
  }

  public getComponents(): number[] {
    const components: number[] = [];
    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      components[ i ] = this.components[ i ];
    }
    return components;
  }

  public getComponent( index: number ): number {
    if ( index >= this.numberOfComponents ) {
      return undefined;
    }

    return this.components[ index ];
  }

  public getLength(): number {
    const length: number = Math.sqrt(
      this.getLengthSquared()
    );

    return length;
  }

  public getLengthSquared(): number {
    let lengthSquared: number;
    lengthSquared = 0;

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      lengthSquared = lengthSquared
        + this.components[ i ] * this.components[ i ];
    }

    return lengthSquared;
  }

  public getDistance( vector: Vector ): number {
    const distance: number = Math.sqrt(
      this.getDistanceSquared( vector )
    );

    return distance;
  }

  public getDistanceSquared( vector: Vector ): number {
    const distanceSquared: number = this
      .clone()
      .subtractVector( vector )
      .getLengthSquared();

    return distanceSquared;
  }

  public getDotProduct( vector: Vector ): number {
    if ( vector.getNumberOfComponents() !== this.numberOfComponents ) {
      return undefined;
    }

    const vComponents: number[] = vector.getComponents();
    let dotProduct: number;
    dotProduct = 0;

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      dotProduct = dotProduct
        + this.components[ i ] * vComponents[ i ];
    }

    return dotProduct;
  }

  public equals( vector: Vector ) {
    if ( vector.getNumberOfComponents() !== this.numberOfComponents ) {
      return false;
    }

    const vComponents: number[] = vector.getComponents();

    for (
      let i = 0;
      i < this.numberOfComponents;
      i++
    ) {
      if ( vComponents[ i ] !== this.components[ i ] ) {
        return false;
      }
    }

    return true;
  }

  public clone(): Vector {
    const clone = new Vector( this.numberOfComponents )
      .setFromVector( this );

    return clone;
  }
}
