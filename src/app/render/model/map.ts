import { LoggingService } from '../../log/service/logging.service';
import { Logger } from '../../log/model/logger';

import { Camera } from './camera';
import { Frustum } from './frustum';
import { Tile } from './tile';
import { Vector3 } from './vector3';
import { Wall } from './wall';

export class Map {
  private logger: Logger =  LoggingService.getLogger('Map');
  tiles: Tile[][];
  width: number;
  length: number;

  // axis of the world coordinate system
  xDirection: Vector3; // represents positive movement along the x axis
  yDirection: Vector3; // represents positive movement along the y axis
  zDirection: Vector3; // represents positive movement along the z axis

  constructor(
  ) {
    this.logger.logDebug('enter constructor');
    this.xDirection = new Vector3();
    this.xDirection.setFromValues(
      1, 0, 0
    );

    this.yDirection = new Vector3();
    this.yDirection.setFromValues(
      0, 1, 0
    );

    this.zDirection = new Vector3();
    this.zDirection.setFromValues(
      0, 0, 1
    );

    this.width = 64;
    this.length = 64;
    this.logger.logDebug('exit constructor');
  }

  hardCodedDemo(): void {
    this.logger.logDebug('enter hardCodedDemo');
    this.tiles = new Array<Array<Tile>>();
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      this.tiles[ix] = new Array<Tile>();
      for(
        let iy: number = 0;
        iy < this.length;
        iy++
      ) {
        const tile: Tile = new Tile();
        this.tiles[ix][iy] = tile;
        //tile.setTileId('t' + ix + iy);
        if(
          ix == 0 || ix == this.width - 1
          || iy == 0 || iy == this.length - 1
        ) {
          //this.logger.logVerbose('tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          //this.logger.logVerbose('tile is not on edge of map');
        }
      }
    }
    this.logger.logDebug('exit hardCodedDemo');
  }

  placeCameraHardCodedDemo(camera: Camera): void {
    this.logger.logDebug('enter placeCameraHardCodedDemo');
    let cameraPosition: Vector3;
    let viewPortDistance: number;
    let viewPortCenterPosition: Vector3;

    camera.setMap(this);

    cameraPosition = new Vector3()
      .setFromValues(
        20, 20, 5
      );

    camera.setCameraPosition(cameraPosition);

    viewPortDistance = camera.getViewPortDistance();

    viewPortCenterPosition = new Vector3().setFromValues(
        20, 20 + viewPortDistance, 5
      );

    camera.setViewPortCenterPosition(viewPortCenterPosition);

    let frustum: Frustum;
    frustum = camera.getViewFrustum();

    let point: Vector3;
    let result: boolean;
    this.logger.logVerbose('testing a point inside the frustum');
    point = new Vector3()
      .setFromValues(
        20, 35, 5
      );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the left plane of the frustum');
    point.setFromValues(
      -500, 30, 5
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the right plane of the frustum');
    point.setFromValues(
      500, 30, 5
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the top plane of the frustum');
    point.setFromValues(
      20, 50, 500
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the bottom plane of the frustum');
    point.setFromValues(
      20, 50, -500
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the near plane of the frustum');
    point.setFromValues(
      20, 24, 5
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logVerbose('testing a point outside the far plane of the frustum');
    point.setFromValues(
      20, 500, 5
    );
    result = frustum.containsPoint(point);
    this.logger.logVerbose('result: ' + result);

    this.logger.logDebug('exit placeCameraHardCodedDemo');
  }

  generate(): void {
    this.logger.logDebug('enter generate');
    this.tiles = new Array<Array<Tile>>();
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      this.tiles[ix] = new Array<Tile>();
      for(
        let iy: number = 0;
        iy < this.length;
        iy++
      ) {
        const tile: Tile = new Tile();
        this.tiles[ix][iy] = tile;
        //tile.setTileId('t' + ix + iy);
        if(
          ix == 0 || ix == this.width - 1
          || iy == 0 || iy == this.length - 1
        ) {
          this.logger.logVerbose('tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          this.logger.logVerbose('tile is not on edge of map');
          if(Math.random() > 0.8) {
            this.logger.logVerbose('tile gets a wall anyways');
            const wall: Wall = new Wall();
            //wall.setWallId('w' + ix + iy);
            tile.wall = wall;
          }
        }
      }
    }
    this.printMap();
    this.logger.logDebug('exit generate');
  }

  printMap(): void {
    this.logger.logDebug('enter printMap');
    for(
      let iy: number = 0;
      iy < this.length;
      iy++
    ) {
      let line: string = '';
      for(
        let ix: number = 0;
        ix < this.width;
        ix++
      ) {
        if(this.tiles[ix][iy].wall) {
          line = line + '#';
        }
        else {
          line = line + ' ';
        }
      }
      this.logger.logVerbose(line);
    }
    this.logger.logDebug('exit printMap');
  }

  getUpDirection(): Vector3 {
    this.logger.logDebug('enter getUpDirection');
    this.logger.logVerbose(
      'upDirection: ('
      + this.zDirection.x + ','
      + this.zDirection.y + ','
      + this.zDirection.z + ')'
    );
    this.logger.logDebug('exit getUpDirection');
    return this.zDirection;
  }

  getTileAt(
    x: number,
    y: number
  ): Tile {
    return this.tiles[x][y];
  }

  getOpenTile(): Tile {
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      for(
        let iy: number = 0;
        iy < this.length;
        iy++
      ) {
        const tile: Tile = this.tiles[ix][iy];
        if (tile.wall) {
          this.logger.logVerbose('tile occupied by wall');
        }
        else {
          this.logger.logVerbose('found an empty tile');
          return tile;
        }
      }
    }
    return null;
  }

  getOpenTileNear(
    x: number,
    y: number
  ): Tile {
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      for(
        let iy: number = 0;
        iy < this.length;
        iy++
      ) {
        if(x + ix >= this.width) {
          this.logger.logVerbose('x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            this.logger.logVerbose('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y + iy];
            if (tile.wall) {
              this.logger.logVerbose('tile occupied by wall');
            }
            else {
              this.logger.logVerbose('found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            this.logger.logVerbose('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y - iy];
            if (tile.wall) {
              this.logger.logVerbose('tile occupied by wall');
            }
            else {
              this.logger.logVerbose('found an empty tile');
              return tile;
            }
          }
        }
        if(x - ix < 0) {
          this.logger.logVerbose('x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            this.logger.logVerbose('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y + iy];
            if (tile.wall) {
              this.logger.logVerbose('tile occupied by wall');
            }
            else {
              this.logger.logVerbose('found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            this.logger.logVerbose('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y - iy];
            if (tile.wall) {
              this.logger.logVerbose('tile occupied by wall');
            }
            else {
              this.logger.logVerbose('found an empty tile');
              return tile;
            }
          }
        }
      }
    }
    return null;
  }

  getTilesInViewFrustum(viewFrustum: Frustum): void {
    let points: Vector3[];
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;

    points = viewFrustum.getPoints();
    // sort them by x and y coordinates
    points.sort(
      (a: Vector3, b: Vector3) => {
        return a.x - b.x;
      }
    );
    minX = points[0].x;
    maxX = points[points.length - 1].x;
    points.sort(
      (a: Vector3, b: Vector3) => {
        return a.y - b.y;
      }
    );
    this.logger.logVerbose('minX: ' + minX);
    this.logger.logVerbose('maxX: ' + maxX);
    this.logger.logVerbose('minY: ' + minY);
    this.logger.logVerbose('maxY: ' + maxY);
    if(minX < 0) {
      this.logger.logError('minX value out of bounds');
      minX = 0;
    }
    if(maxX >= this.width) {
      this.logger.logError('maxX value out of bounds');
      maxX = this.width - 1;
    }
    if(minY < 0) {
      this.logger.logError('minY value out of bounds');
      minY = 0;
    }
    if(maxY >= this.length) {
      this.logger.logError('maxX value out of bounds');
      maxY = this.length - 1;
    }
    for(
      let ix: number = minX;
      ix < maxX;
      ix++
    ) {
      for(
        let iy: number = minY;
        iy < maxY;
        iy++
      ) {
        let tilePosition: Vector3;
        tilePosition = new Vector3();
        tilePosition.setFromValues(
          ix, iy, 0
        );
        if(
          this.tileIntersectsFrustum(
            tilePosition,
            viewFrustum
          )
        ) {
          let tile: Tile;
          tile = this.tiles[ix][iy];
        }


      }
    }
  }

  tileIntersectsFrustum(
    tilePosition: Vector3,
    frustum: Frustum
  ): boolean {
    this.logger.logDebug('enter tileIntersectsFrustum');
    // start by checking if the tile center is in the frustum
    if(frustum.containsPoint(tilePosition)) {
      this.logger.logDebug('exit tileIntersectsFrustum');
      return true;
    }
    let point: Vector3;
    for(
      let ix: number = -0.5;
      ix <= 0.5;
      ix = ix + 0.5
    ) {
      for(
        let iy: number = -.05;
        iy <= 0.5;
        iy = iy + 0.5
      ) {
        if(ix == 0 && iy == 0) {
          // already checked if tile center is in frustum
          continue;
        }
        point = new Vector3();
        point.setFromValues(
          tilePosition.x + ix,
          tilePosition.y + iy,
          tilePosition.z
        );
        if(
          frustum.containsPoint(point)
        ) {
          this.logger.logDebug('exit tileIntersectsFrustum');
          return true;
        }
      }
    }
    this.logger.logDebug('exit tileIntersectsFrustum');
    return false;
  }
}
