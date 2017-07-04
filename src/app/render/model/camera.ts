import { Coordinates } from './coordinates';

export class Camera {
  coordinates: Coordinates;
  direction: number;
  fieldOfView: number;
  viewPortWidth: number;
  viewPortHeight: number;
  focalLength: number;
  maxDrawDistance: number;

  constructor() {
    this.coordinates = new Coordinates;
  }

  turn(degrees: number): void {
    this.direction = this.direction + degrees;
    if(this.direction > 360) {
      while(this.direction > 360) {
        this.direction = this.direction - 360;
      }
    }
    else if(this.direction < 0) {
      while(this.direction < 0) {
        this.direction = this.direction + 360;
      }
    }
  }

  move(
    dx: number,
    dy: number,
    dz: number
  ): void {
    this.coordinates.x = this.coordinates.x + dx;
    this.coordinates.y = this.coordinates.y + dy;
    this.coordinates.z = this.coordinates.z + dz;
  }

  render(): void {}
}
