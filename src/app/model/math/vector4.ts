import { Vector3 } from './vector3';

export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
  }

  // initialization
  setFromValues(
    x: number,
    y: number,
    z: number,
    w: number
  ): Vector4 {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  setFromVector4( vector: Vector4 ): Vector4 {
    this.setFromValues(
      vector.x,
      vector.y,
      vector.z,
      vector.w
    );
    return this;
  }

  setFromVector3( vector: Vector3 ): Vector4 {
    this.setFromValues(
      vector.x,
      vector.y,
      vector.z,
      1
    );
    return this;
  }

  // modification
  addVector( vector: Vector4 ): Vector4 {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    this.z = this.z + vector.z;
    this.w = this.w + vector.w;
    return this;
  }

  subtractVector( vector: Vector4 ): Vector4 {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
    this.z = this.z - vector.z;
    this.w = this.w - vector.w;
    return this;
  }

  addValue( value: number ): Vector4 {
    this.x = this.x + value;
    this.y = this.y + value;
    this.z = this.z + value;
    this.w = this.w + value;
    return this;
  }

  scale( scalar: number ): Vector4 {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
    this.w = this.w * scalar;
    return this;
  }

  normalize() {
  }

  // products
  getMagnitude(): number {
    let magnitude: number;
    magnitude = Math.sqrt( this.getMagnitudeSquared() );
    return magnitude;
  }

  getMagnitudeSquared(): number {
    let magnitude2: number;
    magnitude2 = this.x * this.x
      + this.y * this.y
      + this.z * this.z
      + this.w * this.w
    ;
    return magnitude2;
  }
}
