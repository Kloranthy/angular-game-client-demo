import {
  Component, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

import { LeftControlComponent } from './control/component/left-control/left-control.component';
import { RightControlComponent } from './control/component/right-control/right-control.component';

import { InputProcessorService } from './control/service/input-processor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  tileSize: number; // the size of a tile (resolution?)

  viewPortWidth: number; // the width of the view port
  viewPortHeight: number; // the height of the view port
  viewPortDistance: number; // the distance from the camera to the view port (focal length)
  maxVisibleDistance: number; // the maximum visible distance

  minControlWidth: number; // the minimum width of the control containers
  controlWidth: number;
  controlHeight: number;

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild(LeftControlComponent)
  leftControl: LeftControlComponent;

  @ViewChild(RightControlComponent)
  rightControl: RightControlComponent;
  @ViewChild('canvas') canvas: ElementRef;

  renderContext: CanvasRenderingContext2D;

  constructor(
    private inputProcessor: InputProcessorService
  ) {
    this.tileSize = 8;

    this.viewPortWidth = 5 * this.tileSize;
    this.viewPortHeight = 3 * this.tileSize;
    // todo have view port distance set based on fov and view port dimensions
    this.viewPortDistance = 8 * this.tileSize;
    this.maxVisibleDistance = this.viewPortDistance + 25 * this.tileSize;

    this.minControlWidth = 80;
  }

  ngAfterViewInit(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    const windowWidth = window.innerWidth - 30;
    const windowHeight = window.innerHeight - 30;
    const windowAspectRatio = windowWidth / windowHeight;
    console.log('windowWidth: ' + windowWidth);
    console.log('windowHeight: ' + windowHeight);
    //console.log('windowAspectRatio: ' + windowAspectRatio);

    const viewPortAspectRatio = this.viewPortWidth / this.viewPortHeight;
    //console.log('viewPortAspectRatio: ' + viewPortAspectRatio);

    if(windowAspectRatio > 1) {
      console.log('landscape mode');
      const remainingWidth = 0.8 * windowWidth;
      console.log('removing 20% of window width for controls');
      // deciding whether to use window height or remaining width is the limiting factor
      if(remainingWidth / windowHeight > viewPortAspectRatio) {
        console.log('using window height');
      }
      else {
        console.log('using window width');
        this.canvasWidth = remainingWidth;
        this.canvasHeight = this.canvasWidth / viewPortAspectRatio;
      }
      this.controlWidth = 0.1 * windowWidth;
      this.controlHeight = windowHeight;
    }
    else {
      console.log('portrait mode');
      this.canvasWidth = windowWidth;
      this.canvasHeight = windowWidth / viewPortAspectRatio;
      this.controlWidth = windowWidth / 2;
      this.controlHeight = windowHeight - this.canvasHeight;
    }
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    this.renderContext = canvasElement.getContext('2d');
    console.log('canvasWidth: ' + this.canvasWidth);
    console.log('canvasHeight: ' + this.canvasHeight);

    console.log('controlWidth: ' + this.controlWidth);
    console.log('controlHeight: ' + this.controlHeight);
    setTimeout(
      () => this.leftControl.resize(
        this.controlWidth,
        this.controlHeight
      ),
      0
    );
    setTimeout(
      () => this.rightControl.resize(
        this.controlWidth,
        this.controlHeight
      ),
      0
    );
  }

  onControlPressed(input: string): void {
    if(input === 'render test') {
      this.renderTest();
    }
    else {
      this.inputProcessor.process(input);
    }
  }

  renderTest():void {
    console.log('render test processed');
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
