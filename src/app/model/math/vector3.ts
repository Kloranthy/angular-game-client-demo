

export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  // initialization
  setFromValues(
    x: number,
    y: number,
    z: number
  ): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setFromVector( vector: Vector3 ): Vector3 {
    this.setFromValues(
      vector.x,
      vector.y,
      vector.z
    );
    return this;
  }

  // modification
  addVector( vector: Vector3 ): Vector3 {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    this.z = this.z + vector.z;
    return this;
  }

  subtractVector( vector: Vector3 ): Vector3 {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
    this.z = this.z - vector.z;
    return this;
  }

  addValue( value: number ): Vector3 {
    this.x = this.x + value;
    this.y = this.y + value;
    this.z = this.z + value;
    return this;
  }

  subtractValue( value: number ): Vector3 {
    this.x = this.x - value;
    this.y = this.y - value;
    this.z = this.z - value;
    return this;
  }

  scale( scalar: number ): Vector3 {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
    return this;
  }

  normalize(): Vector3 {
    let length: number;
    length = this.getMagnitude();
    if(length == 1 || length == 0) {
      return this;
    }
    this.scale( 1 / length );
    return this;
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
    ;
    return magnitude2;
  }

  getDistance( vector: Vector3 ): number {
    let distance: number;
    distance = Math.sqrt(
      this.getDistanceSquared( vector )
    );
    return distance;
  }

  getDistanceSquared( vector: Vector3 ): number {
    let distance2: number;
    distance2 = this.clone()
      .subtractVector( vector )
      .getMagnitude();
    return distance2;
  }

  dot( vector: Vector3 ): number {
    let dotProduct: number;
    dotProduct = this.x * vector.x
      + this.y * vector.y
      + this.z * vector.z;
    return dotProduct;
  }

  cross( vector: Vector3 ): Vector3 {
    let crossProduct: Vector3;
    crossProduct = new Vector3()
      .setFromValues(
        this.y * vector.z - this.z * vector.y,
        this.z * vector.x - this.x * vector.z,
        this.x * vector.y - this.y * vector.x
      );
    return crossProduct;
  }

  clone(): Vector3 {
    let clone: Vector3;
    clone = new Vector3()
      .setFromVector( this );
    return clone;
  }
}
