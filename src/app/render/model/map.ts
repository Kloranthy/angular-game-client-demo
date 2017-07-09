import { LoggingService } from '../../core/service/logging.service';

import { Camera } from './camera';
import { Frustum } from './frustum';
import { Tile } from './tile';
import { Vector3 } from './vector3';
import { Wall } from './wall';

export class Map {
  loggingService: LoggingService;
  tiles: Tile[][];
  width: number;
  length: number;

  // axis of the world coordinate system
  xDirection: Vector3; // represents positive movement along the x axis
  yDirection: Vector3; // represents positive movement along the y axis
  zDirection: Vector3; // represents positive movement along the z axis

  constructor(
  ) {
    this.loggingService.logDebug('Map','enter constructor');
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
    this.loggingService.logDebug('Map','exit constructor');
  }

  hardCodedDemo(): void {
    this.loggingService.logDebug('Map','enter hardCodedDemo');
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
          //this.loggingService.logVerbose('Map','tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          //this.loggingService.logVerbose('Map','tile is not on edge of map');
        }
      }
    }
    this.loggingService.logDebug('Map','exit hardCodedDemo');
  }

  placeCameraHardCodedDemo(camera: Camera): void {
    this.loggingService.logDebug('Map','enter placeCameraHardCodedDemo');
    let cameraPosition: Vector3;
    let viewPortDistance: number;
    let viewPortCenterPosition: Vector3;

    cameraPosition = new Vector3();
    cameraPosition.setFromValues(
      20, 20, 2
    );

    camera.setCameraPosition(cameraPosition);

    viewPortDistance = camera.getViewPortDistance();

    viewPortCenterPosition = new Vector3();
    viewPortCenterPosition.setFromValues(
      20, 20 + viewPortDistance, 2
    );

    camera.setViewPortCenterPosition(viewPortCenterPosition);

    camera.calculateViewFrustum();
    this.loggingService.logDebug('Map','exit placeCameraHardCodedDemo');
  }

  generate(): void {
    this.loggingService.logDebug('Map','enter generate');
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
          this.loggingService.logVerbose('Map','tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          this.loggingService.logVerbose('Map','tile is not on edge of map');
          if(Math.random() > 0.8) {
            this.loggingService.logVerbose('Map','tile gets a wall anyways');
            const wall: Wall = new Wall();
            //wall.setWallId('w' + ix + iy);
            tile.wall = wall;
          }
        }
      }
    }
    this.printMap();
    this.loggingService.logDebug('Map','exit generate');
  }

  printMap(): void {
    this.loggingService.logDebug('Map','enter printMap');
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
      this.loggingService.logVerbose('Map',line);
    }
    this.loggingService.logDebug('Map','exit printMap');
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
          this.loggingService.logVerbose('Map','tile occupied by wall');
        }
        else {
          this.loggingService.logVerbose('Map','found an empty tile');
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
          this.loggingService.logVerbose('Map','x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            this.loggingService.logVerbose('Map','y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y + iy];
            if (tile.wall) {
              this.loggingService.logVerbose('Map','tile occupied by wall');
            }
            else {
              this.loggingService.logVerbose('Map','found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            this.loggingService.logVerbose('Map','y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y - iy];
            if (tile.wall) {
              this.loggingService.logVerbose('Map','tile occupied by wall');
            }
            else {
              this.loggingService.logVerbose('Map','found an empty tile');
              return tile;
            }
          }
        }
        if(x - ix < 0) {
          this.loggingService.logVerbose('Map','x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            this.loggingService.logVerbose('Map','y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y + iy];
            if (tile.wall) {
              this.loggingService.logVerbose('Map','tile occupied by wall');
            }
            else {
              this.loggingService.logVerbose('Map','found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            this.loggingService.logVerbose('Map','y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y - iy];
            if (tile.wall) {
              this.loggingService.logVerbose('Map','tile occupied by wall');
            }
            else {
              this.loggingService.logVerbose('Map','found an empty tile');
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
    this.loggingService.logVerbose('Map','minX: ' + minX);
    this.loggingService.logVerbose('Map','maxX: ' + maxX);
    this.loggingService.logVerbose('Map','minY: ' + minY);
    this.loggingService.logVerbose('Map','maxY: ' + maxY);
    if(minX < 0) {
      this.loggingService.logError('Map','minX value out of bounds');
      minX = 0;
    }
    if(maxX >= this.width) {
      this.loggingService.logError('Map','maxX value out of bounds');
      maxX = this.width - 1;
    }
    if(minY < 0) {
      this.loggingService.logError('Map','minY value out of bounds');
      minY = 0;
    }
    if(maxY >= this.length) {
      this.loggingService.logError('Map','maxX value out of bounds');
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
    // start by checking if the tile center is in the frustum
    if(frustum.containsPoint(tilePosition)) {
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
          return true;
        }
      }
    }
    return false;
  }
}
