import {
  Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { Coordinates } from '../../model/coordinates';
import { Camera } from '../../model/camera';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  order: number;

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild('canvas') canvas: ElementRef;
  renderContext: CanvasRenderingContext2D;

  constructor() {
    this.order = 2;

    this.canvasWidth = 400;
    this.canvasHeight = 300;
  }

  ngAfterViewInit(): void {
    console.log('enter ngAfterViewInit');
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    this.renderContext = canvasElement.getContext('2d');
    console.log('exit ngAfterViewInit');
  }


  resizeCanvas(
    canvasWidth: number,
    canvasHeight: number
  ): void {
    console.log('enter resizeCanvas');
    console.log('canvasWidth: ' + canvasWidth);
    console.log('canvasHeight: ' + canvasHeight);
    if(canvasWidth <= 0) {
      console.log('error: canvas width must be positive');
      return;
    }
    else if(canvasHeight <= 0) {
      console.log('error: canvas height must be positive');
      return;
    }
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    console.log('canvas resized');
    console.log('exit resizeCanvas');
  }

  renderFrame(): void {
    console.log('enter renderFrame');
    // todo have CanvasComponent copy the renderedFrame to its canvas
    console.log('exit renderFrame');
  }
}
