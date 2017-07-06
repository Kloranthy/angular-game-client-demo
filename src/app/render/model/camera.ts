import { Coordinates } from './coordinates';

import { CanvasComponent } from '../component/canvas/canvas.component';

export class Camera {
  // todo move this to map
  tileSize: number;

  // fov not currently used
  horizontalFieldOfView: number;
  verticalFieldOfView: number;

  viewPortWidth: number;
  viewPortHeight: number;
  viewPortAspectRatio: number;

  viewPortDistance: number; // todo have this calculated by fov and viewPortWidth
  maxVisibleDistance: number;

  // todo add resolution (number of rays to send out per degree)

  canvas: HTMLCanvasElement; // canvas used for rendering frame
  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  renderContext: CanvasRenderingContext2D;

  constructor(
    private canvasComponent: CanvasComponent
  ) {
    console.log('Camera enter constructor');
    // todo move this to map
    this.tileSize = 8;

    this.horizontalFieldOfView = 90;
    this.verticalFieldOfView = 59;

    this.viewPortWidth = 5 * this.tileSize;
    this.viewPortHeight = 3 * this.tileSize;

    this.viewPortAspectRatio = this.viewPortWidth / this.viewPortHeight;

    // todo have this calculated using fov
    this.viewPortDistance = 8 * this.tileSize;

    this.maxVisibleDistance = this.viewPortDistance + 25 * this.tileSize;

    this.canvasWidth = this.viewPortWidth * 10;
    this.canvasHeight = this.viewPortHeight * 10;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    this.renderContext = this.canvas.getContext('2d');

    this.canvasComponent.viewPortAspectRatio = this.viewPortAspectRatio;
    console.log('Camera exit constructor');
  }

  getViewPortAspectRatio(): number {
    console.log('Camera enter getViewPortAspectRatio');
    console.log('viewPortAspectRatio: ' + this.viewPortAspectRatio);
    console.log('Camera exit getViewPortAspectRatio');
    return this.viewPortAspectRatio;
  }

  // todo add methods for adjusting fov

  renderFrame(): void {
    console.log('Camera enter renderFrame');
    // render frame onto frame buffer canvas
    this.clearFrame();
    this.renderContext.fillStyle = '#00ff00';
    this.renderContext.strokeStyle = '#00ff00';
    this.drawLines();
    this.drawRects();
    // have the canvas component draw the rendered frame
    this.canvasComponent.drawFrame(
      this.canvas
    );
    console.log('Camera exit renderFrame');
  }

  private clearFrame(): void {
    console.log('Camera enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.canvasWidth, this.canvasHeight
    );
    console.log('Camera exit clearFrame');
  }

  private drawLines(): void {
    console.log('Camera enter drawLines');
    let halfCanvasWidth: number;
    let halfCanvasHeight: number;
    let ix: number; // horizontal position relative to camera center
    let iy: number; // vertical position relative to camera center
    let px: number; // horizontal position on view port
    let py: number; // vertical position on view port
    let fromX: number; // starting x coord for line draw
    let fromY: number; // starting y coord for line draw
    let toX: number; // ending x coord for line draw
    let toY: number; // ending y coord for line draw

    // not affected by change in ix and iy
    halfCanvasWidth = this.canvasWidth / 2;
    halfCanvasHeight = this.canvasHeight / 2;
    // floor and ceiling
    for(
      ix = -this.viewPortWidth / 2;
      ix <= this.viewPortWidth / 2;
      ix = ix + this.tileSize
    ) {
      for(
        iy = -this.viewPortHeight / 2;
        iy <= this.viewPortHeight / 2;
        iy = iy + this.viewPortHeight
      ) {
        // from coords are located at view port distance
        px = ix * this.viewPortDistance / this.viewPortDistance;
        py = iy * this.viewPortDistance / this.viewPortDistance;

        fromX = this.canvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        fromY = this.canvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        // to coords are located at max visible distance
        px = ix * this.viewPortDistance / this.maxVisibleDistance;
        py = iy * this.viewPortDistance / this.maxVisibleDistance;

        toX = this.canvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        //halfCanvasWidth + px / this.viewPortWidth * halfCanvasWidth;
        toY = this.canvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        //console.log('fromX: ' + fromX);
        //console.log('fromY: ' + fromY);
        //console.log('toX: ' + toX);
        //console.log('toY: ' + toY);
        this.drawLine(
          fromX, fromY,
          toX, toY
        );
      }
    }
    for(
      ix = -this.viewPortWidth / 2;
      ix <= this.viewPortWidth / 2;
      ix = ix + this.viewPortWidth
    ) {
      for(
        iy = -this.viewPortHeight / 2;
        iy <= this.viewPortHeight / 2;
        iy = iy + this.tileSize
      ) {
        // from coords are located at view port distance
        px = ix * this.viewPortDistance / this.viewPortDistance;
        py = iy * this.viewPortDistance / this.viewPortDistance;

        fromX = this.canvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        fromY = this.canvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        // to coords are located at max visible distance
        px = ix * this.viewPortDistance / this.maxVisibleDistance;
        py = iy * this.viewPortDistance / this.maxVisibleDistance;

        toX = this.canvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        //halfCanvasWidth + px / this.viewPortWidth * halfCanvasWidth;
        toY = this.canvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        //console.log('fromX: ' + fromX);
        //console.log('fromY: ' + fromY);
        //console.log('toX: ' + toX);
        //console.log('toY: ' + toY);
        this.drawLine(
          fromX, fromY,
          toX, toY
        );
      }
    }
    console.log('Camera exit drawLines');
  }

  private drawRects(): void {
    console.log('Camera enter drawRects');
    let id: number; // distance relative to camera
    let ix: number; // horizontal position relative to camera center
    let iy: number; // vertical position relative to camera center
    let iw: number; // world width of the rectangle
    let ih: number; // world height of the rectange
    let px: number; // horizontal position on view port
    let py: number; // vertical position on view port
    let pw: number; // projected width of the rectangle
    let ph: number; // projected height of the rectangle
    let fromX: number; // top left x coord for rect draw
    let fromY: number; // top left y coord for rect draw
    let drawWidth: number; // width of the drawn rectangle
    let drawHeight: number; // height of the drawn rect

    for(
      id = this.viewPortDistance;
      id <= this.maxVisibleDistance;
      id = id + this.tileSize
    ) {
      ix = -this.viewPortWidth / 2;
      iy = this.viewPortHeight / 2;
      iw = this.viewPortWidth;
      ih = this.viewPortHeight;

      px = ix * this.viewPortDistance / id;
      py = iy * this.viewPortDistance / id;
      pw = iw * this.viewPortDistance / id;
      ph = ih * this.viewPortDistance / id;

      fromX = this.canvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
      fromY = this.canvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

      drawWidth = this.canvasWidth * pw / this.viewPortWidth;
      drawHeight = this.canvasHeight * ph / this.viewPortHeight;

      //console.log('fromX: ' + fromX);
      //console.log('fromY: ' + fromY);
      //console.log('drawWidth: ' + drawWidth);
      //console.log('drawHeight: ' + drawHeight);

      this.strokeRect(
        fromX, fromY,
        drawWidth, drawHeight
      );
    }
    console.log('Camera exit drawRects');
  }


  private strokeRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    console.log('Camera enter strokeRect');
    this.renderContext.strokeRect(
      fromX, fromY,
      toX, toY
    );
    console.log('Camera exit strokeRect');
  }

  private fillRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    console.log('Camera enter fillRect');
    this.renderContext.fillRect(
      fromX, fromY,
      toX, toY
    );
    console.log('Camera exit fillRect');
  }

  private drawLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    console.log('Camera enter drawLine');
    this.renderContext.beginPath();
    this.renderContext.moveTo(fromX, fromY);
    this.renderContext.lineTo(toX, toY);
    this.renderContext.stroke();
    console.log('Camera exit drawLine');
  }
}
