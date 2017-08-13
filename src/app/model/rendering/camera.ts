import { Frustum } from '../math/frustum';
import { Vector3 } from '../math/vector3';
import { CameraInternals } from './camera-internals';

export class Camera {

  private cameraInternals: CameraInternals;
  // todo: convert these to position objects
  private cameraPosition: Vector3; // the position of the camera in world coordinates
  private targetPosition: Vector3; // the position the target is focused on

  // todo: use a coordinate system object to hold the camera up, forward, and right directions
  /**
    represents positive movement along the horizontal axis of the camera coordinate system in relation to the world coordinate system
  */
  xDirection: Vector3;
  /**
    represents positive movement along the vertical axis of the camera coordinate system in relation to the world coordinate system
  */
  yDirection: Vector3;
  /**
    represents positive movement along the forward axis of the camera coordinate system in relation to the world coordinate system
  */
  zDirection: Vector3;

  viewFrustum: Frustum; // frustum representing the view of the camera

  constructor() {}

  // initialization
  setCameraInternals( cameraInternals: CameraInternals ): Camera {
    this.cameraInternals = cameraInternals;
    return this;
  }

  setCameraPosition( cameraPosition: Vector3 ): Camera {
    this.cameraPosition = cameraPosition;
    return this;
  }

  setTargetPosition( targetPosition: Vector3 ): Camera {
    this.targetPosition = targetPosition;
    return this;
  }

  getCameraPosition(): Vector3 {
    return this.cameraPosition;
  }

  getTargetPosition(): Vector3 {
    return this.targetPosition;
  }

  extractScene() {}

  getCameraForwardDirection(): Vector3 {
    return this.zDirection;
  }

  getCameraRightDirection(): Vector3 {
    return this.xDirection;
  }

  getCameraUpDirection(): Vector3 {
    return this.yDirection;
  }

  getViewFrustum(): Frustum {
    return this.viewFrustum;
  }
  /**
    calculates the directions of the camera coordinate system in relation to the world system
  */
  private calculateCameraDirections(): Camera {
    this.calculateCameraForwardDirection();
    this.calculateCameraRightDirection();
    this.calculateCameraUpDirection();
    return this;
  }

  /**
    calculates the forward direction(z axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraForwardDirection(): Camera {
    this.zDirection = this.targetPosition.clone()
      .subtractVector(this.cameraPosition)
      .normalize();
    return this;
  }

  /**
    calculates the right direction(x axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraRightDirection(): Camera {
    this.xDirection = this.zDirection.cross(
      this.cameraPosition.getUpDirection()
    )
      .normalize();
    return this;
  }

  /**
    calculates the upward direction(y axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraUpDirection(): Camera {
    this.yDirection = this.xDirection.cross(this.zDirection);
    return this;
  }

  private calculateViewFrustum(): Camera {
    this.calculateCameraDirections();
    this.viewFrustum = new Frustum().calculate(
      this.cameraInternals,
      this.cameraPosition,
      this.zDirection,
      this.xDirection,
      this.yDirection
    );
    return this;
  }
}
