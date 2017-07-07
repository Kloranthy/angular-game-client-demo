import { Tile } from './tile';

import { Wall } from './wall';

export class Map {
  tiles: Tile[][];
  width: number;
  height: number;

  constructor() {
    console.log('Map enter constructor');
    this.width = 64;
    this.height = 64;
    console.log('Map exit constructor');
  }

  generate(): void {
    console.log('Map enter generate');
    if(this.tiles){
      console.log('arrays get declared automagically');
    }
    else {
      this.tiles = new Array<Array<Tile>>();
    }
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
    console.log('Map exit generate');
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
