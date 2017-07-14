import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { CanvasComponent } from '../component/canvas/canvas.component';

import { Map } from './map';
import { Frustum } from './frustum';
import { Vector3 } from './vector3';

export class Camera {
  logger: Logger = LoggingService.getLogger('Camera');

  map: Map; // the map the camera is located in

  viewPortCenterPosition: Vector3; // the position of the center of the view port in world coordinates
  cameraPosition: Vector3; // the position of the camera in world coordinates

  // todo replace this with horizontal fov and aspect ratio
  viewPortWidth: number; // the width of the view port
  viewPortHeight: number; // the height of the view port
  viewPortAspectRatio: number; // the aspect ratio of the view port

  // fov not currently used
  horizontalFieldOfView: number; // visible angle in degrees
  verticalFieldOfView: number; // visible angle in degrees

  // todo have viewPortDistance calculated by fov and viewPortWidth
  viewPortDistance: number; // the distance from the camera to the view port center
  visibleDistance: number; // the distance drawn beyond the view port

  viewFrustum: Frustum;

  resolution: number; // converts from view port units to pixels on buffer canvas

  bufferCanvas: HTMLCanvasElement; // canvas used for rendering frame
  bufferCanvasWidth: number; // the width of the buffer canvas
  bufferCanvasHeight: number; // the height of the buffer canvas

  renderContext: CanvasRenderingContext2D; // the render context of the buffer canvas

  canvasComponent: CanvasComponent; // component that displays rendered frames

  constructor() {
    this.logger.logDebug('enter constructor');
    this.viewPortWidth = 5;
    this.viewPortHeight = 3;
    this.viewPortAspectRatio = this.viewPortWidth / this.viewPortHeight;

    // todo have this calculated using fov?
    // or use this to calculate fov?
    this.viewPortDistance = 8;

    this.visibleDistance = 25;

    this.resolution = 100;

    this.bufferCanvasWidth = this.viewPortWidth * this.resolution;
    this.bufferCanvasHeight = this.viewPortHeight * this.resolution;

    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.width = this.bufferCanvasWidth;
    this.bufferCanvas.height = this.bufferCanvasHeight;

    this.renderContext = this.bufferCanvas.getContext('2d');
    this.logger.logDebug('exit constructor');
  }

  setCanvasComponent(canvasComponent: CanvasComponent): void {
    this.logger.logDebug('enter setCanvasComponent');
    this.canvasComponent = canvasComponent;
    this.canvasComponent.viewPortAspectRatio = this.viewPortAspectRatio;
    this.logger.logDebug('exit setCanvasComponent');
  }

  getViewPortAspectRatio(): number {
    this.logger.logDebug('enter getViewPortAspectRatio');
    this.logger.logVerbose('viewPortAspectRatio: ' + this.viewPortAspectRatio);
    this.logger.logDebug('exit getViewPortAspectRatio');
    return this.viewPortAspectRatio;
  }

  // todo add methods for adjusting fov
  setHorizontalFieldOfView(horizontalFieldOfView: number): void {
    this.logger.logDebug('enter setHorizontalFieldOfView');
    if(horizontalFieldOfView <= 0) {
      this.logger.logError('horizontal field of view must be positive');
      this.logger.logDebug('exit setHorizontalFieldOfView');
      return;
    }
    if(horizontalFieldOfView >= 180) {
      this.logger.logError('horizontal field of view must be less than 180');
      this.logger.logDebug('exit setHorizontalFieldOfView');
      return;
    }
    this.horizontalFieldOfView = horizontalFieldOfView;
    // todo recalculate other values affected by change in horizontal field of view
    // todo move the camera
    let cameraDirection: Vector3;
    cameraDirection = this.calculateCameraDirection();

    this.viewPortDistance = this.viewPortWidth
      / Math.tan(this.horizontalFieldOfView);

    let cameraMovement: Vector3;
    cameraMovement = cameraDirection.clone()
      .scale(this.viewPortDistance);

    this.cameraPosition = this.viewPortCenterPosition.clone()
      .subtractVector(cameraMovement);

    // todo adjust vertical field of view as well?
    // if the camera was moved either the view port height or the
    // vertical field of view must be updated
    this.logger.logVerbose('horizontalFieldOfView: ' + this.horizontalFieldOfView);
    this.logger.logDebug('exit setHorizontalFieldOfView');
  }

  setMap(map: Map): void {
    this.logger.logDebug('enter setMap');
    this.map = map;
    this.logger.logDebug('exit setMap');
  }

  setCameraPosition(cameraPosition: Vector3): void {
    this.logger.logDebug('enter setCameraPosition');
    this.cameraPosition = cameraPosition;
    this.logger.logDebug('exit setCameraPosition');
  }

  setViewPortCenterPosition(viewPortCenterPosition: Vector3): void {
    this.logger.logDebug('enter setViewPortCenterPosition');
    this.viewPortCenterPosition = viewPortCenterPosition;
    this.logger.logDebug('exit setViewPortCenterPosition');
  }

  getViewPortDistance(): number {
    this.logger.logDebug('enter getViewPortDistance');
    this.logger.logVerbose('viewPortDistance: ' + this.viewPortDistance);
    this.logger.logDebug('exit getViewPortDistance');
    return this.viewPortDistance;
  }

  setViewPortDistance(viewPortDistance: number): void {
    this.logger.logDebug('enter setViewPortDistance');
    if(viewPortDistance <= 0) {
      this.logger.logError('view port distance must be a positive number');
      this.logger.logDebug('exit setViewPortDistance');
      return;
    }
    this.viewPortDistance = viewPortDistance;
    this.logger.logVerbose('viewPortDistance: ' + this.viewPortDistance);
    this.logger.logDebug('exit setViewPortDistance');
  }

  calculateCameraDirection(): Vector3 {
    this.logger.logDebug('enter calculateCameraDirection');
    let cameraDirection: Vector3;
    cameraDirection = this.viewPortCenterPosition.clone()
      .subtractVector(this.cameraPosition)
      .scale(1 / this.viewPortDistance);

    this.logger.logVerbose(
      'cameraDirection ('
      + cameraDirection.x + ', '
      + cameraDirection.y + ', '
      + cameraDirection.z + ')'
    );
    this.logger.logDebug('exit calculateCameraDirection');
    return cameraDirection;
  }

  calculateUpDirection(cameraDirection: Vector3): Vector3 {
    this.logger.logDebug('enter calculateUpDirection');
    let upDirection: Vector3;
    upDirection = new Vector3();
    // I'm going to cheat for now, todo replace with actual calculations
    // if/when the camera is able to have a different height than the view port
    upDirection.setFromValues(
      0, 0, 1
    );
    this.logger.logVerbose(
      'upDirection ('
      + upDirection.x + ', '
      + upDirection.y + ', '
      + upDirection.z + ')'
    );
    this.logger.logDebug('exit calculateUpDirection');
    return upDirection;
  }

  calculateDownDirection(cameraDirection: Vector3): Vector3 {
    this.logger.logDebug('enter calculateDownDirection');
    let downDirection: Vector3;
    // I'm going to cheat for now, todo replace with actual calculations
    // if/when the camera is able to have a different height than the view port
    downDirection = new Vector3();
    downDirection.setFromValues(
      0, 0, -1
    );
    this.logger.logVerbose(
      'downDirection ('
      + downDirection.x + ', '
      + downDirection.y + ', '
      + downDirection.z + ')'
    );
    this.logger.logDebug('exit calculateDownDirection');
    return downDirection;
  }

  calculateLeftDirection(cameraDirection: Vector3): Vector3 {
    this.logger.logDebug('enter calculateLeftDirection');
    let leftDirection: Vector3;
    // rotating 90 degrees counter-clockwise
    // x' = x * cos(90) - y * sin(90)
    // y' = x * sin(90) + y * cos(90)
    leftDirection = new Vector3();
    leftDirection.x = cameraDirection.x * 0 - cameraDirection.y * 1;
    leftDirection.y = cameraDirection.x * 1 + cameraDirection.y * 0;
    leftDirection.z = 0; // todo real calc? z should never be needed for left direction unless camera can roll/rotate around camera direction
    this.logger.logVerbose(
      'leftDirection ('
      + leftDirection.x + ', '
      + leftDirection.y + ', '
      + leftDirection.z + ')'
    );
    this.logger.logDebug('exit calculateLeftDirection');
    return leftDirection;
  }

  calculateRightDirection(cameraDirection: Vector3): Vector3 {
    this.logger.logDebug('enter calculateRightDirection');
    let rightDirection: Vector3;
    // rotating 90 degrees clockwise
    // x' = x * cos(-90) - y * sin(-90)
    // y' = x * sin(-90) + y * cos(-90)
    rightDirection = new Vector3();
    rightDirection.x = cameraDirection.x * 0 - cameraDirection.y * -1;
    rightDirection.y = cameraDirection.x * -1 + cameraDirection.y * 0;
    rightDirection.z = 0; // todo real calc? z should never be needed for right direction unless camera can roll/rotate around camera direction
    this.logger.logVerbose(
      'rightDirection ('
      + rightDirection.x + ', '
      + rightDirection.y + ', '
      + rightDirection.z + ')'
    );
    this.logger.logDebug('exit calculateRightDirection');
    return rightDirection;
  }

  calculateViewFrustum(): void {
    this.logger.logDebug('enter calculateViewFrustum');
    this.viewFrustum = new Frustum().calculate(this);
    this.logger.logDebug('exit calculateViewFrustum');
  }

  turnLeft(): void {
    this.logger.logDebug('enter turnLeft');
    // todo
    // rotate the camera direction
    // recalculate the other directions
    // move the camera
    // recalculate the view frustum
    this.logger.logDebug('exit turnLeft');
  }

  turnRight(): void {
    this.logger.logDebug('enter turnRight');
    // todo
    // rotate the camera direction
    // recalculate the other directions
    // move the camera
    // recalculate the view frustum
    this.logger.logDebug('exit turnRight');
  }

  renderFrame(): void {
    this.logger.logDebug('enter renderFrame');
    if(!this.canvasComponent) {
      this.logger.logError('canvas component not set');
      this.logger.logDebug('exit renderFrame');
      return;
    }
    // render frame onto frame buffer canvas
    this.clearFrame();
    this.renderContext.fillStyle = '#00ff00';
    this.renderContext.strokeStyle = '#00ff00';
    // todo ask map for all things inside of view frustum
    // sort by distance from camera
    // draw from furthest away to nearest
    //this.drawLines();
    //this.drawRects();
    // have the canvas component draw the rendered frame
    this.canvasComponent.drawFrame(
      this.bufferCanvas
    );
    this.logger.logDebug('exit renderFrame');
  }

  private clearFrame(): void {
    this.logger.logDebug('enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.bufferCanvasWidth, this.bufferCanvasHeight
    );
    this.logger.logDebug('exit clearFrame');
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
    this.renderContext.strokeRect(
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
    this.renderContext.fillRect(
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
    this.renderContext.beginPath();
    this.renderContext.moveTo(fromX, fromY);
    this.renderContext.lineTo(toX, toY);
    this.renderContext.stroke();
    this.logger.logDebug('exit drawLine');
  }
}
