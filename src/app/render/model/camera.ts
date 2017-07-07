import { CanvasComponent } from '../component/canvas/canvas.component';

import { Map } from './map';
import { Vector2 } from './vector2';
import { Vector3 } from './vector3';

export class Camera {
  map: Map; // the map the camera is located in

  viewPortCenterPosition: Vector3; // the position of the center of the view port in world coordinates
  cameraPosition: Vector3; // the position of the camera in world coordinates

  viewPortWidth: number; // the width of the view port
  viewPortHeight: number; // the height of the view port
  viewPortAspectRatio: number; // the aspect ratio of the view port

  // fov not currently used
  horizontalFieldOfView: number; // visible angle in degrees
  verticalFieldOfView: number; // visible angle in degrees

  // todo have viewPortDistance calculated by fov and viewPortWidth
  viewPortDistance: number; // the distance from the camera to the view port center
  visibleDistance: number; // the distance drawn beyond the view port

  resolution: number; // converts from view port units to pixels on buffer canvas

  bufferCanvas: HTMLCanvasElement; // canvas used for rendering frame
  bufferCanvasWidth: number; // the width of the buffer canvas
  bufferCanvasHeight: number; // the height of the buffer canvas

  renderContext: CanvasRenderingContext2D; // the render context of the buffer canvas

  canvasComponent: CanvasComponent; // component that displays rendered frames

  constructor() {
    console.log('Camera enter constructor');
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
    console.log('Camera exit constructor');
  }

  setCanvasComponent(canvasComponent: CanvasComponent): void {
    this.canvasComponent = canvasComponent;
    this.canvasComponent.viewPortAspectRatio = this.viewPortAspectRatio;
  }

  getViewPortAspectRatio(): number {
    console.log('Camera enter getViewPortAspectRatio');
    console.log('viewPortAspectRatio: ' + this.viewPortAspectRatio);
    console.log('Camera exit getViewPortAspectRatio');
    return this.viewPortAspectRatio;
  }

  // todo add methods for adjusting fov
  setHorizontalFieldOfView(horizontalFieldOfView: number): void {
    console.log('Camera enter setHorizontalFieldOfView');
    if(horizontalFieldOfView <= 0) {
      console.log('error: horizontal field of view must be positive');
    }
    else if(horizontalFieldOfView >= 180) {
      console.log('error: horizontal field of view must be less than 180');
    }
    else {
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
    }
    console.log('horizontalFieldOfView: ' + this.horizontalFieldOfView);
    console.log('Camera exit setHorizontalFieldOfView');
  }

  setMap(map: Map): void {
    console.log('Camera enter setMap');
    this.map = map;
    console.log('Camera exit setMap');
  }

  setCameraPosition(cameraPosition: Vector3): void {
    console.log('Camera enter setCameraPosition');
    this.cameraPosition = cameraPosition;
    console.log('Camera exit setCameraPosition');
  }

  setViewPortCenterPosition(viewPortCenterPosition: Vector3): void {
    console.log('Camera enter setViewPortCenterPosition');
    this.viewPortCenterPosition = viewPortCenterPosition;
    console.log('Camera exit setViewPortCenterPosition');
  }

  getViewPortDistance(): number {
    console.log('Camera enter getViewPortDistance');
    console.log('viewPortDistance: ' + this.viewPortDistance);
    console.log('Camera exit getViewPortDistance');
    return this.viewPortDistance;
  }

  setViewPortDistance(viewPortDistance: number): void {
    console.log('Camera enter setViewPortDistance');
    if(viewPortDistance <= 0) {
      console.log('error: view port distance must be a positive number')
    }
    else {
      this.viewPortDistance = viewPortDistance;
    }
    console.log('Camera exit setViewPortDistance');
  }

  calculateCameraDirection(): Vector3 {
    console.log('Camera enter calculateCameraDirection');
    let cameraDirection: Vector3;
    cameraDirection = this.viewPortCenterPosition.clone()
      .subtractVector(this.cameraPosition)
      .scale(1 / this.viewPortDistance);

    console.log(
      'cameraDirection ('
      + cameraDirection.x + ', '
      + cameraDirection.y + ', '
      + cameraDirection.z + ')'
    );
    console.log('Camera exit calculateCameraDirection');
    return cameraDirection;
  }

  calculateUpDirection(cameraDirection: Vector3): Vector3 {
    console.log('Camera enter calculateUpDirection');
    let upDirection: Vector3;
    upDirection = new Vector3();
    // I'm going to cheat for now, todo replace with actual calculations
    // if/when the camera is able to have a different height than the view port
    upDirection.setFromValues(
      0, 0, 1
    );
    console.log(
      'upDirection ('
      + upDirection.x + ', '
      + upDirection.y + ', '
      + upDirection.z + ')'
    );
    console.log('Camera exit calculateUpDirection');
    return upDirection;
  }

  calculateDownDirection(cameraDirection: Vector3): Vector3 {
    console.log('Camera enter calculateDownDirection');
    let downDirection: Vector3;
    // I'm going to cheat for now, todo replace with actual calculations
    // if/when the camera is able to have a different height than the view port
    downDirection = new Vector3();
    downDirection.setFromValues(
      0, 0, -1
    );
    console.log(
      'downDirection ('
      + downDirection.x + ', '
      + downDirection.y + ', '
      + downDirection.z + ')'
    );
    console.log('Camera exit calculateDownDirection');
    return downDirection;
  }

  calculateLeftDirection(cameraDirection: Vector3): Vector3 {
    console.log('Camera enter calculateLeftDirection');
    let leftDirection: Vector3;
    // rotating 90 degrees counter-clockwise
    // x' = x * cos(90) - y * sin(90)
    // y' = x * sin(90) + y * cos(90)
    leftDirection = new Vector3();
    leftDirection.x = cameraDirection.x * 0 - cameraDirection.y * 1;
    leftDirection.y = cameraDirection.x * 1 + cameraDirection.y * 0;
    leftDirection.z = 0; // todo real calc? z should never be needed for left direction unless camera can roll/rotate around camera direction
    console.log(
      'leftDirection ('
      + leftDirection.x + ', '
      + leftDirection.y + ', '
      + leftDirection.z + ')'
    );
    console.log('Camera exit calculateLeftDirection');
    return leftDirection;
  }

  calculateRightDirection(cameraDirection: Vector3): Vector3 {
    console.log('Camera enter calculateRightDirection');
    let rightDirection: Vector3;
    // rotating 90 degrees clockwise
    // x' = x * cos(-90) - y * sin(-90)
    // y' = x * sin(-90) + y * cos(-90)
    rightDirection = new Vector3();
    rightDirection.x = cameraDirection.x * 0 - cameraDirection.y * -1;
    rightDirection.y = cameraDirection.x * -1 + cameraDirection.y * 0;
    rightDirection.z = 0; // todo real calc? z should never be needed for right direction unless camera can roll/rotate around camera direction
    console.log(
      'rightDirection ('
      + rightDirection.x + ', '
      + rightDirection.y + ', '
      + rightDirection.z + ')'
    );
    console.log('Camera exit calculateRightDirection');
    return rightDirection;
  }

  // shitty name
  calculateVisibleTrapezoid(): void {
    console.log('Camera enter calculateVisibleTrapezoid');
    // just for this demo I'm going to set the view port and camera positions
    let cameraPosition = new Vector2();
    cameraPosition.x = 0;
    cameraPosition.y = 0;
    let viewPortCenterPosition = new Vector2();
    viewPortCenterPosition.x = 0;
    viewPortCenterPosition.y = 8;
    console.log(
      'cameraPosition ('
      + this.cameraPosition.x + ', '
      + this.cameraPosition.y + ')'
    );
    console.log(
      'viewPortCenterPosition ('
      + this.viewPortCenterPosition.x + ', '
      + this.viewPortCenterPosition.y + ')'
    );
    //
    let cameraDirection: Vector2; // the direction the camera is facing
    let leftDirection: Vector2; // perpendicular to the camera direction
    let rightDirection: Vector2; // perpendicular to the camera direction
    let nearLeftPoint: Vector2; // the nearest visible point on the left edge
    let nearRightPoint: Vector2; // the nearest visible point on the right edge
    let farLeftPoint: Vector2; // the farthest visible point on the left edge
    let farRightPoint: Vector2; // the farthest visible point on the right edge

    // start by getting the direction the camera is facing
    cameraDirection = new Vector2();
    cameraDirection.x = (this.viewPortCenterPosition.x - this.cameraPosition.x)
      / this.viewPortDistance;
    cameraDirection.y = (this.viewPortCenterPosition.y - this.cameraPosition.y)
      / this.viewPortDistance;
    console.log(
      'cameraDirection ('
      + cameraDirection.x + ', '
      + cameraDirection.y + ')'
    );

    // the view port extends out perpendicular from this direction
    // todo add matrix stuff
    // rotating 90 degrees counter-clockwise
    // x' = x * cos(90) - y * sin(90)
    // y' = x * sin(90) + y * cos(90)
    leftDirection = new Vector2();
    leftDirection.x = cameraDirection.x * 0 - cameraDirection.y * 1;
    leftDirection.y = cameraDirection.x * 1 - cameraDirection.y * 0;
    console.log(
      'leftDirection ('
      + leftDirection.x + ', '
      + leftDirection.y + ')'
    );
    // rotating 90 degrees clockwise
    // x' = x * cos(-90) - y * sin(-90)
    // y' = x * sin(-90) + y * cos(-90)
    rightDirection = new Vector2();
    rightDirection.x = cameraDirection.x * 0 - cameraDirection.y * -1;
    rightDirection.y = cameraDirection.x * -1 - cameraDirection.y * 0;
    console.log(
      'rightDirection ('
      + rightDirection.x + ', '
      + rightDirection.y + ')'
    );

    // now use the left and right directions to find the near points of the left and right edges
    // note: both x and y use width as magnitude because height will be z
    nearLeftPoint = new Vector2();
    nearLeftPoint.x = this.viewPortCenterPosition.x
      + leftDirection.x * this.viewPortWidth / 2;
    nearLeftPoint.y = this.viewPortCenterPosition.y
      + leftDirection.y * this.viewPortWidth / 2;
    console.log(
      'nearLeftPoint ('
      + nearLeftPoint.x + ', '
      + nearLeftPoint.y + ')'
    );

    nearRightPoint = new Vector2();
    nearRightPoint.x = this.viewPortCenterPosition.x
      + rightDirection.x * this.viewPortWidth / 2;
    nearRightPoint.y = this.viewPortCenterPosition.y
      + rightDirection.y * this.viewPortWidth / 2;
    console.log(
      'nearRightPoint ('
      + nearRightPoint.x + ', '
      + nearRightPoint.y + ')'
    );

    // method 2 - rays out from ray out of view port center
    let farCenterPoint: Vector2; // the center of the far view plane
    let scaledViewPortWidth: number; // the view port width scaled to max distance
    // start by projecting a ray out from the view port center using the camera direction and visible distance
    farCenterPoint = new Vector2();
    farCenterPoint.x = this.viewPortCenterPosition.x
      + cameraDirection.x * this.visibleDistance;
    farCenterPoint.y = this.viewPortCenterPosition.y
      + cameraDirection.y * this.visibleDistance;

    // now scale the view port width
    scaledViewPortWidth = this.viewPortWidth / this.viewPortDistance
      * (this.viewPortDistance + this.visibleDistance);

    farLeftPoint = new Vector2();
    farLeftPoint.x = farCenterPoint.x
      + leftDirection.x * scaledViewPortWidth;
    farLeftPoint.y = farCenterPoint.y
      + leftDirection.y * scaledViewPortWidth;
    console.log(
      'farLeftPoint ('
      + farLeftPoint.x + ', '
      + farLeftPoint.y + ')'
    );
    farRightPoint = new Vector2();
    farRightPoint.x = farCenterPoint.x
      + rightDirection.x * scaledViewPortWidth;
    farRightPoint.y = farCenterPoint.y
      + rightDirection.y * scaledViewPortWidth;
    console.log(
      'farRightPoint ('
      + farRightPoint.x + ', '
      + farRightPoint.y + ')'
    );
    console.log('Camera exit calculateVisibleTrapezoid');
  }

  calculateViewFrustum(): void {
    console.log('Camera enter calculateViewFrustum');
    // just for this demo I'm going to set the view port and camera positions
    this.cameraPosition = new Vector3();
    this.cameraPosition.setFromValues(
      0, 0, 2
    );
    console.log(
      'cameraPosition ('
      + this.cameraPosition.x + ', '
      + this.cameraPosition.y + ', '
      + this.cameraPosition.z + ')'
    );

    this.viewPortCenterPosition = new Vector3();
    this.viewPortCenterPosition.x = Math.sqrt(8);
    this.viewPortCenterPosition.y = Math.sqrt(8);
    this.viewPortCenterPosition.z = 2;
    console.log(
      'viewPortCenterPosition ('
      + this.viewPortCenterPosition.x + ', '
      + this.viewPortCenterPosition.y + ', '
      + this.viewPortCenterPosition.z + ')'
    );
    //
    let cameraDirection: Vector3;
    let upDirection: Vector3;
    let downDirection: Vector3;
    let leftDirection: Vector3;
    let rightDirection: Vector3;
    let nearTopLeftPoint: Vector3;
    let nearTopRightPoint: Vector3;
    let nearBottomLeftPoint: Vector3;
    let nearBottomRightPoint: Vector3;
    let farTopLeftPoint: Vector3;
    let farTopRightPoint: Vector3;
    let farBottomLeftPoint: Vector3;
    let farBottomRightPoint: Vector3;

    // start by calculating the camera direction
    cameraDirection = this.calculateCameraDirection();

    // use the camera direction to calculate the 4 perpendicular directions
    upDirection = this.calculateUpDirection(cameraDirection);
    downDirection = this.calculateDownDirection(cameraDirection);
    leftDirection = this.calculateLeftDirection(cameraDirection);
    rightDirection = this.calculateRightDirection(cameraDirection);

    // use these directions and the view port dimensions to find the near points
    let nearLeftMovement: Vector3;
    let nearRightMovement: Vector3;
    let nearTopMovement: Vector3;
    let nearBottomMovement: Vector3;
    nearLeftMovement = leftDirection.clone()
      .scale(this.viewPortWidth / 2);
    nearRightMovement = rightDirection.clone()
      .scale(this.viewPortWidth / 2);
    nearTopMovement = upDirection.clone()
      .scale(this.viewPortHeight / 2);
    nearBottomMovement = downDirection.clone()
      .scale(this.viewPortHeight / 2);

    nearTopLeftPoint = this.viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearTopMovement);
    console.log(
      'nearTopLeftPoint ('
      + nearTopLeftPoint.x + ', '
      + nearTopLeftPoint.y + ', '
      + nearTopLeftPoint.z + ')'
    );

    nearTopRightPoint = this.viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearTopMovement);
    console.log(
      'nearTopRightPoint ('
      + nearTopRightPoint.x + ', '
      + nearTopRightPoint.y + ', '
      + nearTopRightPoint.z + ')'
    );

    nearBottomLeftPoint = this.viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearBottomMovement);
    console.log(
      'nearBottomLeftPoint ('
      + nearBottomLeftPoint.x + ', '
      + nearBottomLeftPoint.y + ', '
      + nearBottomLeftPoint.z + ')'
    );

    nearBottomRightPoint = this.viewPortCenterPosition.clone()
      .addVector(nearRightMovement)
      .addVector(nearBottomMovement);
    console.log(
      'nearBottomRightPoint ('
      + nearBottomRightPoint.x + ', '
      + nearBottomRightPoint.y + ', '
      + nearBottomRightPoint.z + ')'
    );

    // now extend out from the view port center
    let farMovement: Vector3;
    let farViewCenter: Vector3;

    farMovement = cameraDirection.clone()
      .scale(this.visibleDistance);

    farViewCenter = this.viewPortCenterPosition.clone()
      .addVector(farMovement);
    console.log(
      'farViewCenter ('
      + farViewCenter.x + ', '
      + farViewCenter.y + ', '
      + farViewCenter.z + ')'
    );

    // now scale the view port dimensions
    let scaledViewPortWidth: number;
    let scaledViewPortHeight: number;
    scaledViewPortWidth = this.viewPortWidth
      / this.viewPortDistance
      * (this.viewPortDistance + this.visibleDistance);
    scaledViewPortHeight = this.viewPortHeight
      / this.viewPortDistance
      * (this.viewPortDistance + this.visibleDistance);

    // now calculate the far direction movements
    let farLeftMovement: Vector3;
    let farRightMovement: Vector3;
    let farTopMovement: Vector3;
    let farBottomMovement: Vector3;

    farLeftMovement = leftDirection.clone()
      .scale(scaledViewPortWidth / 2);
    farRightMovement = rightDirection.clone()
      .scale(scaledViewPortWidth / 2);
    farTopMovement = upDirection.clone()
      .scale(scaledViewPortHeight / 2);
    farBottomMovement = downDirection.clone()
      .scale(scaledViewPortHeight / 2);

    // now use these to find the far points
    farTopLeftPoint = farViewCenter.clone()
      .addVector(farLeftMovement)
      .addVector(farTopMovement);
    console.log(
      'farTopLeftPoint ('
      + farTopLeftPoint.x + ', '
      + farTopLeftPoint.y + ', '
      + farTopLeftPoint.z + ')'
    );

    farTopRightPoint = farViewCenter.clone()
      .addVector(farRightMovement)
      .addVector(farTopMovement);
    console.log(
      'farTopRightPoint ('
      + farTopRightPoint.x + ', '
      + farTopRightPoint.y + ', '
      + farTopRightPoint.z + ')'
    );

    farBottomLeftPoint = farViewCenter.clone()
      .addVector(farLeftMovement)
      .addVector(farBottomMovement);
    console.log(
      'farBottomLeftPoint ('
      + farBottomLeftPoint.x + ', '
      + farBottomLeftPoint.y + ', '
      + farBottomLeftPoint.z + ')'
    );

    farBottomRightPoint = farViewCenter.clone()
      .addVector(farRightMovement)
      .addVector(farBottomMovement);
    console.log(
      'farBottomRightPoint ('
      + farBottomRightPoint.x + ', '
      + farBottomRightPoint.y + ', '
      + farBottomRightPoint.z + ')'
    );

    console.log('Camera exit calculateViewFrustum');
  }

  turnLeft(): void {
    console.log('Camera enter turnLeft');
    // todo
    // rotate the camera direction
    // recalculate the other directions
    // move the camera
    // recalculate the view frustum
    console.log('Camera exit turnLeft');
  }

  turnRight(): void {
    console.log('Camera enter turnRight');
    // todo
    // rotate the camera direction
    // recalculate the other directions
    // move the camera
    // recalculate the view frustum
    console.log('Camera exit turnRight');
  }

  renderFrame(): void {
    console.log('Camera enter renderFrame');
    // render frame onto frame buffer canvas
    this.clearFrame();
    this.renderContext.fillStyle = '#00ff00';
    this.renderContext.strokeStyle = '#00ff00';
    //this.drawLines();
    //this.drawRects();
    if(this.canvasComponent) {
      // have the canvas component draw the rendered frame
      this.canvasComponent.drawFrame(
        this.bufferCanvas
      );
    }
    else {
      console.log('error: canvas component not set');
    }
    console.log('Camera exit renderFrame');
  }

  private clearFrame(): void {
    console.log('Camera enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.bufferCanvasWidth, this.bufferCanvasHeight
    );
    console.log('Camera exit clearFrame');
  }
/*
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

        fromX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        fromY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

        // to coords are located at max visible distance
        px = ix * this.viewPortDistance / (this.visibleDistance + this.viewPortDistance);
        py = iy * this.viewPortDistance / this.visibleDistance;

        toX = this.bufferCanvasWidth * (px + this.viewPortWidth / 2) / this.viewPortWidth;
        //halfCanvasWidth + px / this.viewPortWidth * halfCanvasWidth;
        toY = this.bufferCanvasHeight * (-py + this.viewPortHeight / 2) / this.viewPortHeight;

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
*/

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
