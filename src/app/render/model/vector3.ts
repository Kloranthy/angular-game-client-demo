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
    this.logger.logDebug('enter subtractVector');
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
    this.z = this.z - vector.z;
    this.logger.logDebug('exit subtractVector');
    return this;
  }

  scale(scalar: number): Vector3 {
    this.logger.logDebug('enter scale');
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
    this.logger.logDebug('exit scale');
    return this;
  }

  normalize(): Vector3 {
    this.logger.logDebug('enter normalize');
    let length = this.getMagnitude();
    if(length == 1 || length == 0) {
      this.logger.logDebug('exit normalize');
      return this;
    }
    this.scale(1 / Math.sqrt(length * length));
    this.logger.logDebug('exit normalize');
    return this;
  }

  // products
  getMagnitude(): number {
    this.logger.logDebug('enter getMagnitude');
    let magnitude: number;
    magnitude = Math.sqrt(this.getMagnitudeSquared());
    this.logger.logVerbose('magnitude: ' + magnitude);
    this.logger.logDebug('exit getMagnitude');
    return magnitude;
  }

  getMagnitudeSquared(): number {
    this.logger.logDebug('enter getMagnitudeSquared');
    let magnitude2: number;
    magnitude2 = this.x * this.x
      + this.y * this.y
      + this.z * this.z
    ;
    this.logger.logVerbose('magnitude2: ' + magnitude2);
    this.logger.logDebug('exit getMagnitudeSquared');
    return magnitude2;
  }

  getDistance(vector: Vector3): number {
    this.logger.logDebug('enter getDistance');
    let distance: number;
    distance = Math.sqrt(
      this.getDistanceSquared(vector)
    );
    this.logger.logVerbose('distance: ' + distance);
    this.logger.logDebug('exit getDistance');
    return distance;
  }

  getDistanceSquared(vector: Vector3): number {
    this.logger.logDebug('enter getDistanceSquared');
    let distance2: number;
    distance2 = this.clone()
      .subtractVector(vector)
      .getMagnitude();
    this.logger.logVerbose('distance2: ' + distance2);
    this.logger.logDebug('exit getDistanceSquared');
    return distance2;
  }

  dot(vector: Vector3): number {
    this.logger.logDebug('enter dot');
    let dotProduct: number;
    dotProduct = this.x * vector.x
      + this.y * vector.y
      + this.z * vector.z;
    this.logger.logVerbose('dotProduct: ' + dotProduct);
    this.logger.logDebug('exit dot');
    return dotProduct;
  }

  cross(vector: Vector3): Vector3 {
    this.logger.logDebug('enter cross');
    let crossProduct: Vector3;
    crossProduct = new Vector3()
      .setFromValues(
        this.y * vector.z - this.z * vector.y,
        this.z * vector.x - this.x * vector.z,
        this.x * vector.y - this.y * vector.x
      );
    this.logger.logDebug('exit cross');
    return crossProduct;
  }

  clone(): Vector3 {
    this.logger.logDebug('enter clone');
    let clone: Vector3;
    clone = new Vector3()
      .setFromVector(this);
    this.logger.logDebug('exit clone');
    return clone;
  }
}
