import { Injectable } from '@angular/core';

import { ApiService } from '../../core/service/api.service';

import { Camera } from '../../model/camera';
import { Scene } from '../../model/scene';

@Injectable()
export class RenderService {

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
  }

  setDisplayCanvas( displayCanvas: HTMLCanvasElement ): void {
    this.displayCanvas = displayCanvas;
    this.displayCanvasRenderContext = this.displayCanvas.getContext('2d');
  }

  resizeDisplayCanvas(
    width: number,
    height: number
  ): void {
    let displayCanvasAspectRatio: number;
    let viewPortAspectRatio: number;
    displayCanvasAspectRatio = width / height;
    viewPortAspectRatio = this.camera.getViewPortAspectRatio();
    if ( displayCanvasAspectRatio > viewPortAspectRatio ) {
      this.displayCanvasWidth = height * viewPortAspectRatio;
      this.displayCanvasHeight = height;
    }
    else {
      this.displayCanvasWidth = width;
      this.displayCanvasHeight = width / viewPortAspectRatio;
    }
    this.displayCanvas.width = this.displayCanvasWidth;
    this.displayCanvas.height = this.displayCanvasHeight;
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
      setFromCamera visible tiles?
      (for now, in non prototype version server will setFromCamera visible frustum and only send visible tiles to client)
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
    this.clearBuffer();
    if ( !this.scene ) {
      return;
    }
    // convert scene to canvas coordinates?
    // draw each tile in the scene
    // draw each entity in the scene
    this.copyBufferToDisplay();
  }

  private clearBuffer(): void {
    this.bufferCanvasRenderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.bufferCanvasWidth, this.bufferCanvasHeight
    );
  }


  private strokeRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.bufferCanvasRenderContext.strokeRect(
      fromX, fromY,
      toX, toY
    );
  }

  private fillRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.bufferCanvasRenderContext.fillRect(
      fromX, fromY,
      toX, toY
    );
  }

  private drawLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.bufferCanvasRenderContext.beginPath();
    this.bufferCanvasRenderContext.moveTo(fromX, fromY);
    this.bufferCanvasRenderContext.lineTo(toX, toY);
    this.bufferCanvasRenderContext.stroke();
  }

  private copyBufferToDisplay(): void {
    if(!this.bufferCanvas) {
      return;
    }
    if(!this.displayCanvas) {
      return;
    }
    this.displayCanvasRenderContext.drawImage(
      this.bufferCanvas,
      0, 0,
      this.displayCanvasWidth,
      this.displayCanvasHeight
    );
  }
}
