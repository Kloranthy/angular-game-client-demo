

export class CameraInternals {

  private horizontalFieldOfView: number; // visible angle in degrees
  private aspectRatio: number; // the aspect ratio of the view port
  private nearDistance: number;
  private farDistance: number;

  constructor() {
    this.horizontalFieldOfView = 60;
    this.aspectRatio = 1;
    this.nearDistance = 6;
    this.farDistance = 60;
  }

  getHorizontalFieldOfView(): number {
    return this.horizontalFieldOfView;
  }

  setHorizontalFieldOfView( value: number ) {
    this.horizontalFieldOfView = value;
  }

  getAspectRatio(): number {
    return this.aspectRatio;
  }

  setAspectRatio( value: number ) {
    this.aspectRatio = value;
  }

  getNearDistance(): number {
    return this.nearDistance;
  }

  setNearDistance( value: number ) {
    this.nearDistance = value;
  }

  getFarDistance(): number {
    return this.farDistance;
  }

  setFarDistance( value: number ) {
    this.farDistance = value;
  }

  // todo method for lerping between internals
}
