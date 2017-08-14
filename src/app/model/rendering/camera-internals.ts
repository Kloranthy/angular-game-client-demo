

export class CameraInternals {

  private horizontalFieldOfView: number; // visible angle in degrees
  private aspectRatio: number; // the aspect ratio of the view port
  private nearDistance: number;
  private farDistance: number;

  public constructor() {
    this.horizontalFieldOfView = 60;
    this.aspectRatio = 1;
    this.nearDistance = 6;
    this.farDistance = 60;
  }

  // initialization
  public setFromCameraInternals( cameraInternals: CameraInternals ) {
    this
      .setHorizontalFieldOfView(
        cameraInternals.getHorizontalFieldOfView()
      )
      .setAspectRatio(
        cameraInternals.getAspectRatio()
      )
      .setNearDistance(
        cameraInternals.getNearDistance()
      )
      .setFarDistance(
        cameraInternals.getFarDistance()
      );

    return this;
  }

  public setHorizontalFieldOfView(
    horizontalFieldOfView: number
  ): CameraInternals {
    this.horizontalFieldOfView = horizontalFieldOfView;

    return this;
  }

  public setAspectRatio( aspectRatio: number ): CameraInternals {
    this.aspectRatio = aspectRatio;

    return this;
  }

  public setNearDistance( nearDistance: number ): CameraInternals {
    this.nearDistance = nearDistance;

    return this;
  }

  public setFarDistance( farDistance: number ): CameraInternals {
    this.farDistance = farDistance;

    return this;
  }

  // modification

  // products
  public getHorizontalFieldOfView(): number {
    return this.horizontalFieldOfView;
  }

  public getAspectRatio(): number {
    return this.aspectRatio;
  }

  public getNearDistance(): number {
    return this.nearDistance;
  }

  public getFarDistance(): number {
    return this.farDistance;
  }

  // todo method for lerping between internals

  public clone(): CameraInternals {
    const clone: CameraInternals = new CameraInternals()
      .setFromCameraInternals( this );

    return clone;
  }
}
