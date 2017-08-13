
import { Plane } from './plane';
import { Vector3 } from './vector3';
import { CameraInternals } from '../rendering/camera-internals';

export class Frustum {
  // points
  nearTopLeftPoint: Vector3;
  nearTopRightPoint: Vector3;
  nearBottomLeftPoint: Vector3;
  nearBottomRightPoint: Vector3;
  farTopLeftPoint: Vector3;
  farTopRightPoint: Vector3;
  farBottomLeftPoint: Vector3;
  farBottomRightPoint: Vector3;
  // planes
  leftPlane: Plane;
  rightPlane: Plane;
  topPlane: Plane;
  bottomPlane: Plane;
  nearPlane: Plane;
  farPlane: Plane;

  constructor() {
  }

  setFromValues(
    nearTopLeftPoint: Vector3,
    nearTopRightPoint: Vector3,
    nearBottomLeftPoint: Vector3,
    nearBottomRightPoint: Vector3,
    farTopLeftPoint: Vector3,
    farTopRightPoint: Vector3,
    farBottomLeftPoint: Vector3,
    farBottomRightPoint: Vector3,
    leftPlane: Plane,
    rightPlane: Plane,
    topPlane: Plane,
    bottomPlane: Plane,
    nearPlane: Plane,
    farPlane: Plane
  ): Frustum {
    this.nearTopLeftPoint = nearTopLeftPoint;
    this.nearTopRightPoint = nearTopRightPoint;
    this.nearBottomLeftPoint = nearBottomLeftPoint;
    this.nearBottomRightPoint = nearBottomRightPoint;
    this.farTopLeftPoint = farTopLeftPoint;
    this.farTopRightPoint = farTopRightPoint;
    this.farBottomLeftPoint = farBottomLeftPoint;
    this.farBottomRightPoint = farBottomRightPoint;
    this.leftPlane = leftPlane;
    this.rightPlane = rightPlane;
    this.topPlane = topPlane;
    this.bottomPlane = bottomPlane;
    this.nearPlane = nearPlane;
    this.farPlane = farPlane;
    return this;
  }

  setFromFrustum(frustum: Frustum): Frustum {
    this.setFromValues(
      frustum.nearTopLeftPoint,
      frustum.nearTopRightPoint,
      frustum.nearBottomLeftPoint,
      frustum.nearBottomRightPoint,
      frustum.farTopLeftPoint,
      frustum.farTopRightPoint,
      frustum.farBottomLeftPoint,
      frustum.farBottomRightPoint,
      frustum.leftPlane,
      frustum.rightPlane,
      frustum.topPlane,
      frustum.bottomPlane,
      frustum.nearPlane,
      frustum.farPlane
    );
    return this;
  }

  calculate(
    cameraInternals: CameraInternals,
    cameraPosition: Vector3,
    cameraForwardDirection: Vector3,
    cameraRightDirection: Vector3,
    cameraUpDirection: Vector3
  ): Frustum {
    this.calculatePoints(
      cameraInternals,
      cameraPosition,
      cameraForwardDirection,
      cameraRightDirection,
      cameraUpDirection
    );
    this.calculatePlanes();
    return this;
  }

  clone(): Frustum {
    let clone: Frustum;
    clone = new Frustum()
      .setFromFrustum(this);
    return clone;
  }

  getPoints(): Vector3[] {
    let points: Vector3[];
    points = [
      this.nearTopLeftPoint,
      this.nearTopRightPoint,
      this.nearBottomLeftPoint,
      this.nearBottomRightPoint,
      this.farTopLeftPoint,
      this.farTopRightPoint,
      this.farBottomLeftPoint,
      this.farBottomRightPoint
    ];
    return points;
  }

  getPlanes(): Plane[] {
    let planes: Plane[];
    planes = [
      this.leftPlane,
      this.rightPlane,
      this.topPlane,
      this.bottomPlane,
      this.nearPlane,
      this.farPlane
    ];
    return planes;
  }

  containsPoint(point: Vector3): boolean {
    const planes: Plane[] = this.getPlanes();

    for (
      let i = 0;
      i < planes.length;
      i++
    ) {

      if ( planes[ i ].distanceBetweenPlaneAndPoint( point ) < 0 ) {
        return false;
      }
    }

    return true;
  }

  private calculatePoints(
    cameraInternals: CameraInternals,
    cameraPosition: Vector3,
    cameraForwardDirection: Vector3,
    cameraRightDirection: Vector3,
    cameraUpDirection: Vector3
  ): Frustum {
    const horizontalFieldOfView: number = cameraInternals.getHorizontalFieldOfView();
    const aspectRatio: number = cameraInternals.getAspectRatio();
    const nearDistance: number = cameraInternals.getNearDistance();
    const farDistance: number = cameraInternals.getFarDistance();
    const nearCenter: Vector3 = cameraPosition
      .clone()
      .addVector(
        cameraForwardDirection
          .clone()
          .scale(
            nearDistance
          )
      );
    const nearHalfWidth: number = Math.tan( horizontalFieldOfView / 2 ) * nearDistance;
    const nearHalfHeight: number = nearHalfWidth / aspectRatio;
    const farCenter: Vector3 = nearCenter
      .clone()
      .addVector(
        cameraForwardDirection
          .clone()
          .scale(
            farDistance - nearDistance
          )
      );
    const farHalfWidth: number = Math.tan( horizontalFieldOfView / 2 ) * farDistance;
    const farHalfHeight: number = farHalfWidth / aspectRatio;

    this.nearTopLeftPoint = nearCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale( nearHalfWidth )
      )
      .addVector(
        cameraUpDirection.clone()
          .scale( nearHalfHeight )
      );
    this.nearTopRightPoint = nearCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale( nearHalfWidth )
      )
      .addVector(
        cameraUpDirection.clone()
          .scale( nearHalfHeight )
      );
    this.nearBottomLeftPoint = nearCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale( nearHalfWidth )
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale( nearHalfHeight )
      );
    this.nearBottomRightPoint = nearCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale( nearHalfWidth )
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale( nearHalfHeight )
      );
    this.farTopLeftPoint = farCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale( farHalfWidth )
      )
      .addVector(
        cameraUpDirection.clone()
          .scale( farHalfHeight )
      );
    this.farTopRightPoint = farCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale( farHalfWidth )
      )
      .addVector(
        cameraUpDirection.clone()
          .scale( farHalfHeight )
      );
    this.farBottomLeftPoint = farCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale( farHalfWidth )
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale( farHalfHeight )
      );
    this.farBottomRightPoint = farCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale( farHalfWidth )
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale( farHalfHeight )
      );
    return this;
  }

  private calculatePlanes(): Frustum {
    this.leftPlane = new Plane()
      .setFrom3Points(
        this.farTopLeftPoint,
        this.nearTopLeftPoint,
        this.nearBottomLeftPoint
      );
    this.rightPlane = new Plane()
      .setFrom3Points(
        this.nearTopRightPoint,
        this.farTopRightPoint,
        this.farBottomRightPoint
      );
    this.topPlane = new Plane()
      .setFrom3Points(
        this.nearTopRightPoint,
        this.nearTopLeftPoint,
        this.farTopLeftPoint
      );
    this.bottomPlane = new Plane()
      .setFrom3Points(
        this.nearBottomLeftPoint,
        this.nearBottomRightPoint,
        this.farBottomRightPoint
      );
    this.nearPlane = new Plane()
      .setFrom3Points(
        this.nearTopLeftPoint,
        this.nearTopRightPoint,
        this.nearBottomRightPoint
      );
    this.farPlane = new Plane()
      .setFrom3Points(
        this.farTopRightPoint,
        this.farTopLeftPoint,
        this.farBottomLeftPoint
      );
    return this;
  }

}