
import { Plane } from './plane';
import { Vector3 } from './vector3';
import { CameraInternals } from '../rendering/camera-internals';
import { Transform } from '../location/transform';
import { Matrix3 } from './matrix3';
import { Camera } from '../rendering/camera';

export class Frustum {
  // points
  private nearTopLeftPoint: Vector3;
  private nearTopRightPoint: Vector3;
  private nearBottomLeftPoint: Vector3;
  private nearBottomRightPoint: Vector3;
  private farTopLeftPoint: Vector3;
  private farTopRightPoint: Vector3;
  private farBottomLeftPoint: Vector3;
  private farBottomRightPoint: Vector3;
  // planes
  private leftPlane: Plane;
  private rightPlane: Plane;
  private topPlane: Plane;
  private bottomPlane: Plane;
  private nearPlane: Plane;
  private farPlane: Plane;
  // additional clipping plane for portal frustums?

  public constructor() {
  }

  // initialization
  public setFromValues(
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

  public setFromFrustum( frustum: Frustum ): Frustum {
    this.setFromValues(
      frustum.getNearTopLeftPoint(),
      frustum.getNearTopRightPoint(),
      frustum.getNearBottomLeftPoint(),
      frustum.getNearBottomRightPoint(),
      frustum.getFarTopLeftPoint(),
      frustum.getFarTopRightPoint(),
      frustum.getFarBottomLeftPoint(),
      frustum.getFarBottomRightPoint(),
      frustum.getLeftPlane(),
      frustum.getRightPlane(),
      frustum.getTopPlane(),
      frustum.getBottomPlane(),
      frustum.getNearPlane(),
      frustum.getFarPlane()
    );
    return this;
  }

  public setFromCamera(
    camera: Camera
  ): Frustum {
    const cameraInternals: CameraInternals = camera.getCameraInternals();
    const cameraTransform: Transform = camera.getTransform();

    const horizontalFieldOfView: number = cameraInternals.getHorizontalFieldOfView();
    const aspectRatio: number = cameraInternals.getAspectRatio();
    const nearDistance: number = cameraInternals.getNearDistance();
    const farDistance: number = cameraInternals.getFarDistance();

    const cameraPosition: Vector3 = cameraTransform.getPositionVector();
    const cameraRotationMatrix: Matrix3 = cameraTransform.getRotationMatrix();
    const crmElements: number[][] = cameraRotationMatrix.getElements();
    const cameraForwardDirection: Vector3 = new Vector3()
      .setX( crmElements[ 0 ][ 2 ] )
      .setY( crmElements[ 1 ][ 2 ] )
      .setZ( crmElements[ 2 ][ 2 ] );
    const cameraRightDirection: Vector3 = new Vector3()
      .setX( crmElements[ 0 ][ 0 ] )
      .setY( crmElements[ 1 ][ 0 ] )
      .setZ( crmElements[ 2 ][ 0 ] );
    const cameraUpDirection: Vector3 = new Vector3()
      .setX( crmElements[ 0 ][ 1 ] )
      .setY( crmElements[ 1 ][ 1 ] )
      .setZ( crmElements[ 2 ][ 1 ] );

    this.calculateViewFrustum(
      horizontalFieldOfView,
      aspectRatio,
      nearDistance,
      farDistance,
      cameraPosition,
      cameraForwardDirection,
      cameraRightDirection,
      cameraUpDirection
    );

    return this;
  }

  public calculateViewFrustum(
    horizontalFieldOfView: number,
    aspectRatio: number,
    nearDistance: number,
    farDistance: number,
    position: Vector3,
    forwardDirection: Vector3,
    rightDirection: Vector3,
    upDirection: Vector3
  ): Frustum {
    this.calculatePoints(
      horizontalFieldOfView,
      aspectRatio,
      nearDistance,
      farDistance,
      position,
      forwardDirection,
      rightDirection,
      upDirection
    );
    this.calculatePlanes();

    return this;
  }

  // products
  public getPoints(): Vector3[] {
    const points: Vector3[] = [
      this.nearTopLeftPoint.clone(),
      this.nearTopRightPoint.clone(),
      this.nearBottomLeftPoint.clone(),
      this.nearBottomRightPoint.clone(),
      this.farTopLeftPoint.clone(),
      this.farTopRightPoint.clone(),
      this.farBottomLeftPoint.clone(),
      this.farBottomRightPoint.clone()
    ];

    return points;
  }

  public getNearTopLeftPoint(): Vector3 {
    const nearTopLeftPoint: Vector3 = this.nearTopLeftPoint.clone();

    return nearTopLeftPoint;
  }

  public getNearTopRightPoint(): Vector3 {
    const nearTopRightPoint: Vector3 = this.nearTopRightPoint.clone();

    return nearTopRightPoint;
  }

  public getNearBottomLeftPoint(): Vector3 {
    const nearBottomLeftPoint: Vector3 = this.nearBottomLeftPoint.clone();

    return nearBottomLeftPoint;
  }

  public getNearBottomRightPoint(): Vector3 {
    const nearBottomRightPoint: Vector3 = this.nearBottomRightPoint.clone();

    return nearBottomRightPoint;
  }

  public getFarTopLeftPoint(): Vector3 {
    const farTopLeftPoint: Vector3 = this.farTopLeftPoint.clone();

    return farTopLeftPoint;
  }

  public getFarTopRightPoint(): Vector3 {
    const farTopRightPoint: Vector3 = this.farTopRightPoint.clone();

    return farTopRightPoint;
  }

  public getFarBottomLeftPoint(): Vector3 {
    const farBottomLeftPoint: Vector3 = this.farBottomLeftPoint.clone();

    return farBottomLeftPoint;
  }

  public getFarBottomRightPoint(): Vector3 {
    const farBottomRightPoint: Vector3 = this.farBottomRightPoint.clone();

    return farBottomRightPoint;
  }

  public getPlanes(): Plane[] {
    const planes: Plane[] = [
      this.leftPlane.clone(),
      this.rightPlane.clone(),
      this.topPlane.clone(),
      this.bottomPlane.clone(),
      this.nearPlane.clone(),
      this.farPlane.clone()
    ];

    return planes;
  }

  public getLeftPlane(): Plane {
    const leftPlane: Plane = this.leftPlane.clone();

    return leftPlane;
  }

  public getRightPlane(): Plane {
    const rightPlane: Plane = this.rightPlane.clone();

    return rightPlane;
  }

  public getTopPlane(): Plane {
    return this.topPlane;
  }

  public getBottomPlane(): Plane {
    return this.bottomPlane;
  }

  public getNearPlane(): Plane {
    return this.nearPlane;
  }

  public getFarPlane(): Plane {
    return this.farPlane;
  }

  public containsPoint(point: Vector3): boolean {
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

  public clone(): Frustum {
    const clone: Frustum = new Frustum()
      .setFromFrustum(this);

    return clone;
  }

  private calculatePoints(
    horizontalFieldOfView: number,
    aspectRatio: number,
    nearDistance: number,
    farDistance: number,
    position: Vector3,
    forwardDirection: Vector3,
    rightDirection: Vector3,
    upDirection: Vector3
  ): Frustum {
    const nearHalfWidth: number = Math.tan( horizontalFieldOfView / 2 )
      * nearDistance;
    const nearHalfHeight: number = nearHalfWidth / aspectRatio;
    const farHalfWidth: number = Math.tan( horizontalFieldOfView / 2 )
      * farDistance;
    const farHalfHeight: number = farHalfWidth / aspectRatio;

    const nearCenter: Vector3 = position.clone();
    nearCenter.addVector(
      forwardDirection
        .clone()
        .multiplyScalar( nearDistance )
    );

    const farCenter: Vector3 = position.clone();
    farCenter.addVector(
      forwardDirection
        .clone()
        .multiplyScalar( farDistance )
    );

    this.nearTopLeftPoint = nearCenter.clone();
    this.nearTopLeftPoint
      .subtractVector(
        rightDirection
          .clone()
          .multiplyScalar( nearHalfWidth )
      )
      .addVector(
        upDirection
          .clone()
          .multiplyScalar( nearHalfHeight )
      );
    this.nearTopRightPoint = nearCenter.clone();
    this.nearTopRightPoint
      .addVector(
        rightDirection
          .clone()
          .multiplyScalar( nearHalfWidth )
      )
      .addVector(
        upDirection
          .clone()
          .multiplyScalar( nearHalfHeight )
      );
    this.nearBottomLeftPoint = nearCenter.clone();
    this.nearBottomLeftPoint
      .subtractVector(
        rightDirection
          .clone()
          .multiplyScalar( nearHalfWidth )
      )
      .subtractVector(
        upDirection.clone()
          .multiplyScalar( nearHalfHeight )
      );
    this.nearBottomRightPoint = nearCenter.clone();
    this.nearBottomRightPoint
      .addVector(
        rightDirection
          .clone()
          .multiplyScalar( nearHalfWidth )
      )
      .subtractVector(
        upDirection
          .clone()
          .multiplyScalar( nearHalfHeight )
      );
    this.farTopLeftPoint = farCenter.clone();
    this.farTopLeftPoint
      .subtractVector(
        rightDirection
          .clone()
          .multiplyScalar( farHalfWidth )
      )
      .addVector(
        upDirection
          .clone()
          .multiplyScalar( farHalfHeight )
      );
    this.farTopRightPoint = farCenter.clone();
    this.farTopRightPoint
      .addVector(
        rightDirection
          .clone()
          .multiplyScalar( farHalfWidth )
      )
      .addVector(
        upDirection
          .clone()
          .multiplyScalar( farHalfHeight )
      );
    this.farBottomLeftPoint = farCenter.clone();
    this.farBottomLeftPoint
      .subtractVector(
        rightDirection
          .clone()
          .multiplyScalar( farHalfWidth )
      )
      .subtractVector(
        upDirection
          .clone()
          .multiplyScalar( farHalfHeight )
      );
    this.farBottomRightPoint = farCenter.clone();
    this.farBottomRightPoint
      .addVector(
        rightDirection
          .clone()
          .multiplyScalar( farHalfWidth )
      )
      .subtractVector(
        upDirection
          .clone()
          .multiplyScalar( farHalfHeight )
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
