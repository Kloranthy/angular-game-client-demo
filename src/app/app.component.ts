import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  tileSize: number = 8;

  viewPortWidth: number = 5 * this.tileSize;
  viewPortHeight: number = 3 * this.tileSize;
  viewPortDistance: number = 8 * this.tileSize;
  maxVisibleDistance: number = this.viewPortDistance + 25 * this.tileSize;

  canvasWidth: number;
  canvasHeight: number;

  @ViewChild('canvas') canvas: ElementRef;

  renderContext: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    const windowWidth = window.innerWidth - 30;
    const windowHeight = window.innerHeight - 30;
    const windowAspectRatio = windowWidth / windowHeight;
    console.log('windowWidth: ' + windowWidth);
    console.log('windowHeight: ' + windowHeight);
    console.log('windowAspectRatio: ' + windowAspectRatio);
    const viewPortAspectRatio = this.viewPortWidth / this.viewPortHeight;
    console.log('viewPortAspectRatio: ' + viewPortAspectRatio);
    if(windowAspectRatio > viewPortAspectRatio) {
      this.canvasWidth = windowHeight * viewPortAspectRatio;
      this.canvasHeight = windowHeight;
    }
    else {
      this.canvasWidth = windowWidth;
      this.canvasHeight = windowWidth / viewPortAspectRatio;
    }
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    this.renderContext = canvasElement.getContext('2d');
    console.log('canvasWidth: ' + this.canvasWidth);
    console.log('canvasHeight: ' + this.canvasHeight);
  }

  moveForward(): void {
    console.log('move forward pressed');
  }
  moveLeft(): void {
    console.log('move left pressed');
  }
  moveRight(): void {
    console.log('move right pressed');
  }
  moveBackward(): void {
    console.log('move back pressed');
  }

  turnLeft(): void {
    console.log('turn left pressed');
  }

  targetLeft(): void {
    console.log('target left pressed');
  }

  turnRight(): void {
    console.log('turn right pressed');
  }

  targetRight(): void {
    console.log('target right pressed');
  }

  renderTest():void {
    this.renderFrame();
  }

  renderFrame(): void {
    console.log('enter renderFrame');
    this.clearFrame();

    this.renderContext.fillStyle = '#00ff00';
    this.renderContext.strokeStyle = '#00ff00';

    this.renderContext.lineWidth = 1;
    this.drawLines();
    this.drawRects();

    console.log('exit renderFrame');
  }

  private drawLines(): void {
    console.log('enter drawLines');
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
    console.log('exit drawLines');
  }

  private drawRects(): void {
    console.log('enter drawRects');
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

      console.log('fromX: ' + fromX);
      console.log('fromY: ' + fromY);
      console.log('drawWidth: ' + drawWidth);
      console.log('drawHeight: ' + drawHeight);

      this.strokeRect(
        fromX, fromY,
        drawWidth, drawHeight
      );
    }
    console.log('exit drawRects');
  }

  private clearFrame(): void {
    console.log('enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.fillRect(
      0, 0,
      this.canvasWidth, this.canvasHeight
    );
    console.log('exit clearFrame');
  }

  private strokeRect(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): void {
    this.renderContext.strokeRect(
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
    this.renderContext.fillRect(
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
    this.renderContext.beginPath();
    this.renderContext.moveTo(fromX, fromY);
    this.renderContext.lineTo(toX, toY);
    this.renderContext.stroke();
  }
}
