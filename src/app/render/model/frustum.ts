import { Camera } from './camera';
import { Vector3 } from './vector3';

export class Frustum {
  nearTopLeftPoint: Vector3;
  nearTopRightPoint: Vector3;
  nearBottomLeftPoint: Vector3;
  nearBottomRightPoint: Vector3;
  farTopLeftPoint: Vector3;
  farTopRightPoint: Vector3;
  farBottomLeftPoint: Vector3;
  farBottomRightPoint: Vector3;

  constructor() {
    console.log('Frustum enter constructor');
    console.log('Frustum exit constructor');
  }

  setFromValues(
    nearTopLeftPoint: Vector3,
    nearTopRightPoint: Vector3,
    nearBottomLeftPoint: Vector3,
    nearBottomRightPoint: Vector3,
    farTopLeftPoint: Vector3,
    farTopRightPoint: Vector3,
    farBottomLeftPoint: Vector3,
    farBottomRightPoint: Vector3
  ): Frustum {
    this.nearTopLeftPoint = nearTopLeftPoint;
    this.nearTopRightPoint = nearTopRightPoint;
    this.nearBottomLeftPoint = nearBottomLeftPoint;
    this.nearBottomRightPoint = nearBottomRightPoint;
    this.farTopLeftPoint = farTopLeftPoint;
    this.farTopRightPoint = farTopRightPoint;
    this.farBottomLeftPoint = farBottomLeftPoint;
    this.farBottomRightPoint = farBottomRightPoint;
    return this;
  }

  setFromFrustum(frustum: Frustum): Frustum {
    return this.setFromValues(
      frustum.nearTopLeftPoint,
      frustum.nearTopRightPoint,
      frustum.nearBottomLeftPoint,
      frustum.nearBottomRightPoint,
      frustum.farTopLeftPoint,
      frustum.farTopRightPoint,
      frustum.farBottomLeftPoint,
      frustum.farBottomRightPoint
    );
  }

  calculate(
    camera: Camera
  ): void {
    console.log('Frustum enter calculate');
    let cameraPosition: Vector3;
    let viewPortCenterPosition: Vector3;
    let cameraDirection: Vector3;

    cameraPosition = camera.cameraPosition;
    viewPortCenterPosition = camera.viewPortCenterPosition;
    cameraDirection = camera.calculateCameraDirection();

    console.log('Frustum exit calculate');
  }

  clone(): Frustum {
    let clone: Frustum;
    clone = new Frustum();
    return clone.setFromFrustum(this);
  }
}
