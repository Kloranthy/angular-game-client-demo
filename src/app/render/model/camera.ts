import { Coordinates } from './coordinates';

export class Camera {
  tileSize: number = 8;

  horizontalFieldOfView: number = 90;
  verticalFieldOfView: number = 59;

  viewPortWidth: number = 5 * this.tileSize;
  viewPortHeight: number = 3 * this.tileSize;

  viewPortDistance: number = 8 * this.tileSize; // todo have this calculated by fov and viewPortWidth
  maxVisibleDistance: number = this.viewPortDistance + 25 * this.tileSize;

  // todo add resolution (number of rays to send out per degree)

  constructor() {
  }

  render(): void {}
}
