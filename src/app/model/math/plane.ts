
import { Vector3 } from './vector3';

export class Plane {

  normal: Vector3; // the normal vector of the plane
  distance: number; // the distance of the normal from the origin

  constructor(
  ) {
  }

  // initialization
  setFromValues(
    normal: Vector3,
    distance: number
  ): Plane {
    this.normal = normal;
    this.distance = distance;
    this.normalize();
    return this;
  }

  setFrom3Points(
    pointA: Vector3,
    pointB: Vector3,
    pointC: Vector3
  ): Plane {
    let v: Vector3;
    let u: Vector3;
    v = pointB.clone()
      .subtractVector(pointA);
    u = pointC.clone()
      .subtractVector(pointA);
    this.normal = v.cross(u);
    this.distance = -this.normal.dot(pointA);
    this.normalize();
    return this;
  }

  setFromNormalVectorAndAPoint(
    normal: Vector3,
    point: Vector3
  ): Plane {
    this.normal = normal;
    this.distance = this.normal.dot(point);
    this.normalize();
    return this;
  }

  setFromPlane(plane: Plane): Plane {
    this.setFromValues(
      plane.normal,
      plane.distance
    );
    this.normalize();
    return this;
  }

  // modification
  normalize(): Plane {
    let magnitude: number;
    magnitude = this.normal.getMagnitude();
    this.normal.normalize();
    this.distance = this.distance / magnitude;
    return this;
  }

  // products
  distanceBetweenPlaneAndPoint(
    point: Vector3
  ): number {
    let distanceBetweenPlaneAndPoint: number;
    distanceBetweenPlaneAndPoint = this.normal.dot(point)
    + this.distance;
    return distanceBetweenPlaneAndPoint;
  }

  clone(): Plane {
    let clone: Plane;
    clone = new Plane()
      .setFromPlane(this);
    return clone;
  }
}
