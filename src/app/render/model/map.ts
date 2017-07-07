import { Camera } from './camera';
import { Tile } from './tile';
import { Vector3 } from './vector3';
import { Wall } from './wall';

export class Map {
  tiles: Tile[][];
  width: number;
  height: number;

  // axis of the world coordinate system
  xDirection: Vector3; // represents positive movement along the x axis
  yDirection: Vector3; // represents positive movement along the y axis
  zDirection: Vector3; // represents positive movement along the z axis

  constructor() {
    console.log('Map enter constructor');
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
    this.height = 64;
    console.log('Map exit constructor');
  }

  hardCodedDemo(): void {
    console.log('Map enter hardCodedDemo');
    this.tiles = new Array<Array<Tile>>();
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      this.tiles[ix] = new Array<Tile>();
      for(
        let iy: number = 0;
        iy < this.height;
        iy++
      ) {
        const tile: Tile = new Tile();
        this.tiles[ix][iy] = tile;
        //tile.setTileId('t' + ix + iy);
        if(
          ix == 0 || ix == this.width - 1
          || iy == 0 || iy == this.height - 1
        ) {
          //console.log('tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          //console.log('tile is not on edge of map');
        }
      }
    }
    console.log('Map exit hardCodedDemo');
  }

  placeCameraHardCodedDemo(camera: Camera): void {
    console.log('Map enter placeCameraHardCodedDemo');
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

    console.log('Map exit placeCameraHardCodedDemo');
  }

  generate(): void {
    console.log('Map enter generate');
    this.tiles = new Array<Array<Tile>>();
    for(
      let ix: number = 0;
      ix < this.width;
      ix++
    ) {
      this.tiles[ix] = new Array<Tile>();
      for(
        let iy: number = 0;
        iy < this.height;
        iy++
      ) {
        const tile: Tile = new Tile();
        this.tiles[ix][iy] = tile;
        //tile.setTileId('t' + ix + iy);
        if(
          ix == 0 || ix == this.width - 1
          || iy == 0 || iy == this.height - 1
        ) {
          console.log('tile is on edge of map');
          const wall: Wall = new Wall();
          //wall.setWallId('w' + ix + iy);
          tile.wall = wall;
        }
        else {
          console.log('tile is not on edge of map');
          if(Math.random() > 0.8) {
            console.log('tile gets a wall anyways');
            const wall: Wall = new Wall();
            //wall.setWallId('w' + ix + iy);
            tile.wall = wall;
          }
        }
      }
    }
    this.printMap();
    console.log('Map exit generate');
  }

  printMap(): void {
    console.log('Map enter printMap');
    for(
      let iy: number = 0;
      iy < this.height;
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
      console.log(line);
    }
    console.log('Map exit printMap');
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
        iy < this.height;
        iy++
      ) {
        const tile: Tile = this.tiles[ix][iy];
        if (tile.wall) {
          console.log('tile occupied by wall');
        }
        else {
          console.log('found an empty tile');
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
        iy < this.height;
        iy++
      ) {
        if(x + ix >= this.width) {
          console.log('x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            console.log('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y + iy];
            if (tile.wall) {
              console.log('tile occupied by wall');
            }
            else {
              console.log('found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            console.log('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x + ix][y - iy];
            if (tile.wall) {
              console.log('tile occupied by wall');
            }
            else {
              console.log('found an empty tile');
              return tile;
            }
          }
        }
        if(x - ix < 0) {
          console.log('x out of bounds');
        }
        else {
          if(y + iy >= this.width) {
            console.log('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y + iy];
            if (tile.wall) {
              console.log('tile occupied by wall');
            }
            else {
              console.log('found an empty tile');
              return tile;
            }
          }
          if(y - iy < 0) {
            console.log('y out of bounds');
          }
          else {
            const tile: Tile = this.tiles[x - ix][y - iy];
            if (tile.wall) {
              console.log('tile occupied by wall');
            }
            else {
              console.log('found an empty tile');
              return tile;
            }
          }
        }
      }
    }
    return null;
  }
}
