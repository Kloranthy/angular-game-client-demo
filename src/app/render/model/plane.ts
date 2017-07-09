import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Vector3 } from './vector3';

export class Plane {
  logger: Logger = LoggingService.getLogger('Plane');

  normal: Vector3; // the normal extending from the origin
  distance: number; // the distance of the normal from the origin

  constructor(
  ) {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  setFromValues(
    normal: Vector3,
    distance: number
  ): Plane {
    this.logger.logDebug('enter setFromValues');
    this.normal = normal;
    this.distance = distance;
    this.logger.logVerbose('normal: ' + this.normal);
    this.logger.logVerbose('distance: ' + this.distance);
    this.logger.logDebug('exit setFromValues');
    return this;
  }

  setFrom3Points(
    pointA: Vector3,
    pointB: Vector3,
    pointC: Vector3
  ): Plane {
    this.logger.logDebug('enter setFrom3Points');
    let v: Vector3;
    let u: Vector3;
    v = pointB.clone()
      .subtractVector(pointA);
    u = pointC.clone()
      .subtractVector(pointA);
    this.normal = v.cross(u);
    this.distance = this.normal.dot(pointA);
    this.logger.logVerbose(
      'normal ('
      + this.normal.x + ', '
      + this.normal.y + ', '
      + this.normal.z + ')'
    );
    this.logger.logVerbose('distance: ' + this.distance);
    this.logger.logDebug('exit setFrom3Points');
    return this;
  }

  setFromPlane(plane: Plane): Plane {
    this.logger.logDebug('enter setFromPlane');
    this.setFromValues(
      plane.normal,
      plane.distance
    );
    this.logger.logDebug('exit setFromPlane');
    return this;
  }

  distanceBetweenPlaneAndPoint(
    point: Vector3
  ): number {
    this.logger.logDebug('enter distanceBetweenPlaneAndPoint');
    let dotProduct: number;
    dotProduct = this.normal.dot(point) + this.distance;
    this.logger.logVerbose('distance: ' + dotProduct);
    this.logger.logDebug('exit distanceBetweenPlaneAndPoint');
    return dotProduct;
  }

  clone(): Plane {
    this.logger.logDebug('enter clone');
    let clone: Plane;
    clone = new Plane()
      .setFromPlane(this);
    this.logger.logDebug('exit clone');
    return clone;
  }
}