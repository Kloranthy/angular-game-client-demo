import {
  Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { Camera } from '../../model/camera';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  viewPortAspectRatio: number; // the width of the view port

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild('canvas') canvas: ElementRef;

  renderContext: CanvasRenderingContext2D;

  constructor() {
    console.log('CanvasComponent enter constructor');
    console.log('CanvasComponent exit constructor');
  }

  ngAfterViewInit(): void {
    console.log('CanvasComponent enter ngAfterViewInit');
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.renderContext = canvasElement.getContext('2d');
    console.log('CanvasComponent exit ngAfterViewInit');
  }


  resize(
    width: number,
    height: number
  ): void {
    console.log('CanvasComponent enter resize');
    console.log('width: ' + width);
    console.log('height: ' + height);
    if(width <= 0) {
      console.log('error: canvas width must be positive');
      return;
    }
    else if(height <= 0) {
      console.log('error: canvas height must be positive');
      return;
    }
    if(this.viewPortAspectRatio) {
      console.log('making canvas conform to view port aspect ratio');
      if(width / height > this.viewPortAspectRatio) {
        console.log('values wider than view port aspect ratio');
        console.log('using height multiplied by view port aspect ratio for canvas width');
        this.canvasWidth = height * this.viewPortAspectRatio;
        this.canvasHeight = height;
      }
      else {
        console.log('values taller than view port aspect ratio');
        console.log('using width divided by view port aspect ratio for canvas height');
        this.canvasWidth = width;
        this.canvasHeight = width / this.viewPortAspectRatio;
      }
    }
    else {
      console.log('error: viewPortAspectRatio undefined');
      console.log('using values without adjustment');
      this.canvasWidth = width;
      this.canvasHeight = height;
    }

    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    console.log('canvas resized');
    console.log('CanvasComponent exit resizeCanvas');
  }

  drawFrame(canvas: HTMLCanvasElement): void {
    console.log('CanvasComponent enter renderFrame');
    // is clearing the frame necessary?
    this.clearFrame();
    this.renderContext.drawImage(
      canvas,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    console.log('CanvasComponent exit renderFrame');
  }


  private clearFrame(): void {
    console.log('CanvasComponent enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.renderContext.fillRect(
      0, 0,
      this.canvasWidth, this.canvasHeight
    );
    console.log('CanvasComponent exit clearFrame');
  }
}
