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
  horizontalFieldOfView: number; // angle in degrees
  verticalFieldOfView: number; // angle in degrees

  // todo have viewPortDistance calculated by fov and viewPortWidth
  viewPortDistance: number; // the distance from the camera to the view port center
  visibleDistance: number; // the distance drawn beyond the view port

  resolution: number; // number of rays to send out per degree

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

    // todo have this calculated using fov
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
      this.viewPortDistance = this.viewPortWidth
        / Math.tan(this.horizontalFieldOfView);
      // todo move the camera
      // todo adjust vertical field of view as well?
    }
    console.log('horizontalFieldOfView: ' + this.horizontalFieldOfView);
    console.log('Camera exit setHorizontalFieldOfView');
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
    this.cameraPosition.x = 0;
    this.cameraPosition.y = 0;
    this.cameraPosition.z = 2;
    console.log(
      'cameraPosition ('
      + this.cameraPosition.x + ', '
      + this.cameraPosition.y + ', '
      + this.cameraPosition.z + ')'
    );

    this.viewPortCenterPosition = new Vector3();
    this.viewPortCenterPosition.x = 0;
    this.viewPortCenterPosition.y = 8;
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
    let nearTopLeft: Vector3;
    let nearTopRight: Vector3;
    let nearBottomLeft: Vector3;
    let nearBottomRight: Vector3;
    let farTopLeft: Vector3;
    let farTopRight: Vector3;
    let farBottomLeft: Vector3;
    let farBottomRight: Vector3;

    // start by calculating the camera direction
    cameraDirection = new Vector3();
    cameraDirection.x = (this.viewPortCenterPosition.x - this.cameraPosition.x)
      / this.viewPortDistance;
    cameraDirection.y = (this.viewPortCenterPosition.y - this.cameraPosition.y)
      / this.viewPortDistance;
    cameraDirection.z = (this.viewPortCenterPosition.z - this.cameraPosition.z)
      / this.viewPortDistance;
    console.log(
      'cameraDirection ('
      + cameraDirection.x + ', '
      + cameraDirection.y + ', '
      + cameraDirection.z + ')'
    );

    // use the camera direction to calculate the 4 perpendicular directions
    upDirection = new Vector3();
    // I'm going to cheat for now, todo replace with actual calculations
    upDirection.x = 0;
    upDirection.y = 0;
    upDirection.z = 1;
    console.log(
      'upDirection ('
      + upDirection.x + ', '
      + upDirection.y + ', '
      + upDirection.z + ')'
    );

    downDirection = new Vector3();
    downDirection.x = 0;
    downDirection.y = 0;
    downDirection.z = -1;
    console.log(
      'downDirection ('
      + downDirection.x + ', '
      + downDirection.y + ', '
      + downDirection.z + ')'
    );

    // rotating 90 degrees counter-clockwise
    // x' = x * cos(90) - y * sin(90)
    // y' = x * sin(90) + y * cos(90)
    leftDirection = new Vector3();
    leftDirection.x = cameraDirection.x * 0 - cameraDirection.y * 1;
    leftDirection.y = cameraDirection.x * 1 + cameraDirection.y * 0;
    leftDirection.z = 0; // todo real calc
    console.log(
      'leftDirection ('
      + leftDirection.x + ', '
      + leftDirection.y + ', '
      + leftDirection.z + ')'
    );

    // rotating 90 degrees clockwise
    // x' = x * cos(-90) - y * sin(-90)
    // y' = x * sin(-90) + y * cos(-90)
    rightDirection = new Vector3();
    rightDirection.x = cameraDirection.x * 0 - cameraDirection.y * -1;
    rightDirection.y = cameraDirection.x * -1 + cameraDirection.y * 0;
    rightDirection.z = 0; // todo real calc
    console.log(
      'rightDirection ('
      + rightDirection.x + ', '
      + rightDirection.y + ', '
      + rightDirection.z + ')'
    );

    // use these directions and the view port dimensions to find the near points
    nearTopLeft = new Vector3();
    nearTopLeft.x = this.viewPortCenterPosition.x
      + leftDirection.x * this.viewPortWidth / 2
      + upDirection.x * this.viewPortHeight / 2;
    nearTopLeft.y = this.viewPortCenterPosition.y
      + leftDirection.y * this.viewPortWidth / 2
      + upDirection.y * this.viewPortHeight / 2;
    nearTopLeft.z = this.viewPortCenterPosition.z
      + leftDirection.z * this.viewPortWidth / 2
      + upDirection.z * this.viewPortHeight / 2;
    console.log(
      'nearTopLeft ('
      + nearTopLeft.x + ', '
      + nearTopLeft.y + ', '
      + nearTopLeft.z + ')'
    );

    nearTopRight = new Vector3();
    nearTopRight.x = this.viewPortCenterPosition.x
      + rightDirection.x * this.viewPortWidth / 2
      + upDirection.x * this.viewPortHeight / 2;
    nearTopRight.y = this.viewPortCenterPosition.y
      + rightDirection.y * this.viewPortWidth / 2
      + upDirection.y * this.viewPortHeight / 2;
    nearTopRight.z = this.viewPortCenterPosition.z
      + rightDirection.z * this.viewPortWidth / 2
      + upDirection.z * this.viewPortHeight / 2;
    console.log(
      'nearTopRight ('
      + nearTopRight.x + ', '
      + nearTopRight.y + ', '
      + nearTopRight.z + ')'
    );

    nearBottomLeft = new Vector3();
    nearBottomLeft.x = this.viewPortCenterPosition.x
      + leftDirection.x * this.viewPortWidth / 2
      + downDirection.x * this.viewPortHeight / 2;
    nearBottomLeft.y = this.viewPortCenterPosition.y
      + leftDirection.y * this.viewPortWidth / 2
      + downDirection.y * this.viewPortHeight / 2;
    nearBottomLeft.z = this.viewPortCenterPosition.z
      + leftDirection.z * this.viewPortWidth / 2
      + downDirection.z * this.viewPortHeight / 2;
    console.log(
      'nearBottomLeft ('
      + nearBottomLeft.x + ', '
      + nearBottomLeft.y + ', '
      + nearBottomLeft.z + ')'
    );

    nearBottomRight = new Vector3();
    nearBottomRight.x = this.viewPortCenterPosition.x
      + rightDirection.x * this.viewPortWidth / 2
      + downDirection.x * this.viewPortHeight / 2;
    nearBottomRight.y = this.viewPortCenterPosition.y
      + rightDirection.y * this.viewPortWidth / 2
      + downDirection.y * this.viewPortHeight / 2;
    nearBottomRight.z = this.viewPortCenterPosition.z
      + rightDirection.z * this.viewPortWidth / 2
      + downDirection.z * this.viewPortHeight / 2;
    console.log(
      'nearBottomRight ('
      + nearBottomRight.x + ', '
      + nearBottomRight.y + ', '
      + nearBottomRight.z + ')'
    );

    // now extend out from the view port center
    let farViewCenter: Vector3;
    farViewCenter = new Vector3();
    farViewCenter.x = this.viewPortCenterPosition.x
      + cameraDirection.x * this.visibleDistance;
    farViewCenter.y = this.viewPortCenterPosition.y
      + cameraDirection.y * this.visibleDistance;
    farViewCenter.z = this.viewPortCenterPosition.z
      + cameraDirection.z * this.visibleDistance;
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

    // now use these to find the far points
    farTopLeft = new Vector3();
    farTopLeft.x = farViewCenter.x
      + leftDirection.x * scaledViewPortWidth / 2
      + upDirection.x * scaledViewPortHeight / 2;
    farTopLeft.y = farViewCenter.y
      + leftDirection.y * scaledViewPortWidth / 2
      + upDirection.y * scaledViewPortHeight / 2;
    farTopLeft.z = farViewCenter.z
      + leftDirection.z * scaledViewPortWidth / 2
      + upDirection.z * scaledViewPortHeight / 2;
    console.log(
      'farTopLeft ('
      + farTopLeft.x + ', '
      + farTopLeft.y + ', '
      + farTopLeft.z + ')'
    );

    farTopRight = new Vector3();
    farTopRight.x = farViewCenter.x
      + rightDirection.x * scaledViewPortWidth / 2
      + upDirection.x * scaledViewPortHeight / 2;
    farTopRight.y = farViewCenter.y
      + rightDirection.y * scaledViewPortWidth / 2
      + upDirection.y * scaledViewPortHeight / 2;
    farTopRight.z = farViewCenter.z
      + rightDirection.z * scaledViewPortWidth / 2
      + upDirection.z * scaledViewPortHeight / 2;
    console.log(
      'farTopRight ('
      + farTopRight.x + ', '
      + farTopRight.y + ', '
      + farTopRight.z + ')'
    );

    farBottomLeft = new Vector3();
    farBottomLeft.x = farViewCenter.x
      + leftDirection.x * scaledViewPortWidth / 2
      + downDirection.x * scaledViewPortHeight / 2;
    farBottomLeft.y = farViewCenter.y
      + leftDirection.y * scaledViewPortWidth / 2
      + downDirection.y * scaledViewPortHeight / 2;
    farBottomLeft.z = farViewCenter.z
      + leftDirection.z * scaledViewPortWidth / 2
      + downDirection.z * scaledViewPortHeight / 2;
    console.log(
      'farBottomLeft ('
      + farBottomLeft.x + ', '
      + farBottomLeft.y + ', '
      + farBottomLeft.z + ')'
    );

    farBottomRight = new Vector3();
    farBottomRight.x = farViewCenter.x
      + rightDirection.x * scaledViewPortWidth / 2
      + downDirection.x * scaledViewPortHeight / 2;
    farBottomRight.y = farViewCenter.y
      + rightDirection.y * scaledViewPortWidth / 2
      + downDirection.y * scaledViewPortHeight / 2;
    farBottomRight.z = farViewCenter.z
      + rightDirection.z * scaledViewPortWidth / 2
      + downDirection.z * scaledViewPortHeight / 2;
    console.log(
      'farBottomRight ('
      + farBottomRight.x + ', '
      + farBottomRight.y + ', '
      + farBottomRight.z + ')'
    );

    console.log('Camera exit calculateViewFrustum');
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
