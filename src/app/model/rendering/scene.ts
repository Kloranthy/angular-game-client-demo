import { Tile } from '../location/tile';

export class Scene {

  // todo add camera reference?

  visibleTiles: Tile[];

  constructor() {
  }

  getVisibleTiles(): Tile[] {
    return this.visibleTiles;
  }

  /**
    converts the scene from world coordinates to view coordinates
  */
  convertToViewCoordinates(): void {}

  convertToScreenCoordinates(): void {}

  /**
    sorts the tiles and entities by their distance from the camera (z)
  */
  sort(): void {}
}
