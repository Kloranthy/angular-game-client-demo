import { Injectable } from '@angular/core';

import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { ApiService } from '../../core/service/api.service';

import { Camera } from '../model/camera';
import { Scene } from '../model/scene';

@Injectable()
export class RenderService {
  private logger: Logger = LoggingService.getLogger('RenderService');

  /**
    the camera whose view is being drawn
  */
  camera: Camera;

  /**
    a collection of visible tiles and entities
    with their positions in camera coordinates
    and sorted by distance from camera
  */
  scene: Scene;

  /**
    the canvas used for double buffering
  */
  bufferCanvas: HTMLCanvasElement;
  /**
    the width of the buffer canvas
  */
  bufferCanvasWidth: number;
  /**
    the height of the buffer canvas
  */
  bufferCanvasHeight: number;
  /**
    the rendering context of the buffer canvas
  */
  bufferCanvasRenderContext: CanvasRenderingContext2D;

  /**
    the canvas shown on the screen
  */
  displayCanvas: HTMLCanvasElement;
  /**
    the width of the display canvas
  */
  displayCanvasWidth: number;
  /**
    the height of the display canvas
  */
  displayCanvasHeight: number;
  /**
    the rendering context of the display canvas
  */
  displayCanvasRenderContext: CanvasRenderingContext2D;


  constructor(
    private apiService: ApiService
  ) {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  setDisplayCanvas(displayCanvas: HTMLCanvasElement): void {
    this.logger.logDebug('enter setDisplayCanvas');
    this.displayCanvas = displayCanvas;
    this.displayCanvasRenderContext = this.displayCanvas.getContext('2d');
    this.logger.logDebug('exit setDisplayCanvas');
  }

  /*
  todo planning for render service
  what responsibilities to have?
    register camera
      pass a reference to a camera
      to extract from 'scenes' from world to be rendered

    register display canvas
      pass the service a reference to a canvas
      to draw rendered frames onto

    calculation of view frustum?

    rendering of camera view
      calculate visible tiles?
      (for now, in non prototype version server will calculate visible frustum and only send visible tiles to client)
      sort visible tiles by distance from camera
      draw tiles onto buffer canvas
      sort visible entities by distance from camera
      draw visible entities onto buffer canvas
      copy buffer canvas onto display canvas

    adjustment of camera?
      rotation and positioning
      field of view and aspect ratio
      view port distance and visible distance

  what methods to have to accomplish those responsibilities?
  renderFrame
  */

  // old stuff

  /**
    renders a frame
  */
  renderFrame(): void {
    this.logger.logDebug('enter renderFrame');
    this.clearBuffer();
    if(!this.scene) {
      this.logger.logError('no scene to render');
      this.logger.logDebug('exit renderFrame');
      return;
    }
    // convert scene to canvas coordinates?
    // draw each tile in the scene
    // draw each entity in the scene
    this.copyBufferToDisplay();
    this.logger.logDebug('exit renderFrame');
  }

  private clearBuffer(): void {
    this.logger.logDebug('enter clearBuffer');
    this.bufferCanvasRenderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.bufferCanvasWidth, this.bufferCanvasHeight
    );
    this.logger.logDebug('exit clearBuffer');
  }
/*
  private drawLines(): void {
    this.logger.logDebug('enter drawLines');
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
    halfCanvasWidth = this.bufferCanvasWidth / 2;
    halfCanvasHeight = this.bufferCanvasHeight / 2;
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

        fromX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        fromY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        // to coords are located at max visible distance
        px = ix * this.viewPortDistance / (this.visibleDistance + this.viewPortDistance);
        py = iy * this.viewPortDistance / (this.visibleDistance + this.viewPortDistance);

        toX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        //halfCanvasWidth + px / this.viewPortWidth * halfCanvasWidth;
        toY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        //this.logger.logVerbose('fromX: ' + fromX);
        //this.logger.logVerbose('fromY: ' + fromY);
        //this.logger.logVerbose('toX: ' + toX);
        //this.logger.logVerbose('toY: ' + toY);
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

        fromX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        fromY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        // to coords are located at max visible distance
        px = ix * this.viewPortDistance / (this.visibleDistance + this.viewPortDistance);
        py = iy * this.viewPortDistance / this.visibleDistance;

        toX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        //halfCanvasWidth + px / this.viewPortWidth * halfCanvasWidth;
        toY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        //this.logger.logVerbose('fromX: ' + fromX);
        //this.logger.logVerbose('fromY: ' + fromY);
        //this.logger.logVerbose('toX: ' + toX);
        //this.logger.logVerbose('toY: ' + toY);
        this.drawLine(
          fromX, fromY,
          toX, toY
        );
      }
    }
    this.logger.logDebug('exit drawLines');
  }

  private drawRects(): void {
    this.logger.logDebug('enter drawRects');
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
      id <= (this.visibleDistance + this.viewPortDistance);
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

      fromX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
      fromY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

      drawWidth = this.bufferCanvasWidth * pw / this.viewPortWidth;
      drawHeight = this.bufferCanvasHeight * ph / this.viewPortHeight;

      //this.logger.logVerbose('fromX: ' + fromX);
      //this.logger.logVerbose('fromY: ' + fromY);
      //this.logger.logVerbose('drawWidth: ' + drawWidth);
      //this.logger.logVerbose('drawHeight: ' + drawHeight);

      this.strokeRect(
        fromX, fromY,
        drawWidth, drawHeight
      );
    }
    this.logger.logDebug('exit drawRects');
  }
*/

  private strokeRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.logger.logDebug('enter strokeRect');
    this.bufferCanvasRenderContext.strokeRect(
      fromX, fromY,
      toX, toY
    );
    this.logger.logDebug('exit strokeRect');
  }

  private fillRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.logger.logDebug('enter fillRect');
    this.bufferCanvasRenderContext.fillRect(
      fromX, fromY,
      toX, toY
    );
    this.logger.logDebug('exit fillRect');
  }

  private drawLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.logger.logDebug('enter drawLine');
    this.bufferCanvasRenderContext.beginPath();
    this.bufferCanvasRenderContext.moveTo(fromX, fromY);
    this.bufferCanvasRenderContext.lineTo(toX, toY);
    this.bufferCanvasRenderContext.stroke();
    this.logger.logDebug('exit drawLine');
  }

  private copyBufferToDisplay(): void {
    this.logger.logDebug('enter copyBufferToDisplay');
    if(!this.bufferCanvas) {
      this.logger.logError('buffer canvas undefined');
      this.logger.logDebug('exit copyBufferToDisplay');
      return;
    }
    if(!this.displayCanvas) {
      this.logger.logError('display canvas undefined');
      this.logger.logDebug('exit copyBufferToDisplay');
      return;
    }
    this.displayCanvasRenderContext.drawImage(
      this.bufferCanvas,
      0, 0,
      this.displayCanvasWidth,
      this.displayCanvasHeight
    );
    this.logger.logDebug('exit copyBufferToDisplay');
  }
}
