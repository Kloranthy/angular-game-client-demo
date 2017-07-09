import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

export class Vector3 {
  logger: Logger = LoggingService.getLogger('Vector3');
  x: number;
  y: number;
  z: number;

  constructor() {
    this.logger.logDebug('enter constructor');
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.logger.logDebug('exit constructor');
  }

  // initialization
  setFromValues(
    x: number, y: number, z:number
  ): Vector3 {
    this.logger.logDebug('enter setFromValues');
    this.x = x;
    this.y = y;
    this.z = z;
    this.logger.logDebug('exit setFromValues');
    return this;
  }

  setFromVector(vector: Vector3): Vector3 {
    this.logger.logDebug('enter setFromVector');
    this.setFromValues(
      vector.x,
      vector.y,
      vector.z
    );
    this.logger.logDebug('exit setFromVector');
    return this;
  }

  // modification
  addVector(vector: Vector3): Vector3 {
    this.logger.logDebug('enter addVector');
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    this.z = this.z + vector.z;
    this.logger.logDebug('exit addVector');
    return this;
  }

  addValue(value: number): Vector3 {
    this.logger.logDebug('enter addValue');
    this.x = this.x + value;
    this.y = this.y + value;
    this.z = this.z + value;
    this.logger.logDebug('exit addValue');
    return this;
  }

  subtractVector(vector: Vector3): Vector3 {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
    this.z = this.z - vector.z;
    return this;
  }

  scale(scalar: number): Vector3 {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
    return this;
  }

  normalize(): Vector3 {
    let length = this.getMagnitude();
    if(length == 1 || length == 0) {
      return this;
    }
    this.scale(1 / Math.sqrt(length * length));
    return this;
  }

  // products
  getMagnitude(): number {
    return Math.sqrt(this.getMagnitudeSquared());
  }

  getMagnitudeSquared(): number {
    let magnitude2: number;
    magnitude2 = this.x * this.x
      + this.y * this.y
      + this.z * this.z
    ;
    return magnitude2;
  }

  getDistance(vector: Vector3): number {
    return Math.sqrt(
      this.getDistanceSquared(vector)
    );
  }

  getDistanceSquared(vector: Vector3): number {
    return this.clone()
      .subtractVector(vector)
      .getMagnitude();
  }

  dot(vector: Vector3): number {
    let dotProduct: number;
    dotProduct = this.x * vector.x
      + this.y * vector.y
      + this.z * vector.z;
      return dotProduct;
  }

  cross(vector: Vector3): Vector3 {
    return new Vector3()
      .setFromValues(
        this.y * vector.z - this.z * vector.y,
        this.z * vector.x - this.x * vector.z,
        this.x * vector.y - this.y * vector.x
      );
  }

  clone(): Vector3 {
    return new Vector3()
      .setFromVector(this);
  }
}
