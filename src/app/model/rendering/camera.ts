import { CameraInternals } from './camera-internals';
import { Frustum } from '../math/frustum';
import { Vector3 } from '../math/vector3';
import { Transform } from '../location/transform';

export class Camera {
  private cameraInternals: CameraInternals;
  private transform: Transform;

  constructor() {
    this.cameraInternals = new CameraInternals();
  }

  // initialization
  public setFromCamera( camera: Camera ): Camera {
    this
      .setCameraInternals(
        camera.getCameraInternals()
      )
      .setTransform(
        camera.getTransform()
      );

    return this;
  }

  public setCameraInternals(
    cameraInternals: CameraInternals
  ): Camera {
    this.cameraInternals = cameraInternals;

    return this;
  }

  public setTransform( transform: Transform ): Camera {
    this.transform = transform;

    return this;
  }

  setCameraPosition( cameraPosition: Vector3 ): Camera {
    this.transform.setPositionFromVector( cameraPosition );

    return this;
  }

  setTargetPosition( targetPosition: Vector3 ): Camera {
    this.calculateCameraDirections( targetPosition );

    return this;
  }

  // modification

  // products
  public getCameraInternals(): CameraInternals {
    const cameraInternals: CameraInternals = this.cameraInternals.clone();

    return cameraInternals;
  }

  public getTransform(): Transform {
    const transform: Transform = this.transform.clone();

    return transform;
  }

  public getCameraPosition(): Vector3 {
    const cameraPosition: Vector3 = this.transform.getPositionVector();

    return cameraPosition;
  }

  public extractScene() {
    const viewFrustum: Frustum = new Frustum()
      .setFromCamera( this );
  }
  /**
    calculates the directions of the camera coordinate system in relation to the world system
  */
  private calculateCameraDirections( targetPosition: Vector3 ): Camera {
    const cameraPosition: Vector3 = this.getCameraPosition();

    const zDirection: Vector3 = targetPosition.clone();
    zDirection
      .subtractVector( cameraPosition )
      .normalize();

    const xDirection: Vector3 = zDirection
      .getCrossProduct(
        cameraPosition
      );
    xDirection.normalize();

    const yDirection: Vector3 = xDirection.getCrossProduct(
      zDirection
    );

    return this;
  }
}
