import {
  Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { LoggingService } from '../../../core/service/logging.service';
import { Logger } from '../../../core/model/logger';

import { Camera } from '../../model/camera';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  logger: Logger = LoggingService.getLogger('CanvasComponent');

  viewPortAspectRatio: number; // the width of the view port

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild('canvas') canvas: ElementRef;

  renderContext: CanvasRenderingContext2D;

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  ngAfterViewInit(): void {
    this.logger.logDebug('enter ngAfterViewInit');
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.renderContext = canvasElement.getContext('2d');
    this.logger.logDebug('exit ngAfterViewInit');
  }


  resize(
    width: number,
    height: number
  ): void {
    this.logger.logDebug('enter resize');
    this.logger.logVerbose('width: ' + width);
    this.logger.logVerbose('height: ' + height);
    if(width <= 0) {
      this.logger.logError('canvas width must be positive');
      return;
    }
    else if(height <= 0) {
      this.logger.logError('canvas height must be positive');
      return;
    }
    if(this.viewPortAspectRatio) {
      this.logger.logVerbose('making canvas conform to view port aspect ratio');
      if(width / height > this.viewPortAspectRatio) {
        this.logger.logVerbose('values wider than view port aspect ratio');
        this.logger.logVerbose('using height multiplied by view port aspect ratio for canvas width');
        this.canvasWidth = height * this.viewPortAspectRatio;
        this.canvasHeight = height;
      }
      else {
        this.logger.logVerbose('values taller than view port aspect ratio');
        this.logger.logVerbose('using width divided by view port aspect ratio for canvas height');
        this.canvasWidth = width;
        this.canvasHeight = width / this.viewPortAspectRatio;
      }
    }
    else {
      this.logger.logWarning('viewPortAspectRatio undefined');
      this.logger.logVerbose('using values without adjustment');
      this.canvasWidth = width;
      this.canvasHeight = height;
    }

    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    this.logger.logVerbose('canvas resized');
    this.logger.logDebug('exit resizeCanvas');
  }

  drawFrame(canvas: HTMLCanvasElement): void {
    this.logger.logDebug('enter renderFrame');
    // is clearing the frame necessary?
    this.clearFrame();
    this.renderContext.drawImage(
      canvas,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    this.logger.logDebug('exit renderFrame');
  }


  private clearFrame(): void {
    this.logger.logDebug('enter clearFrame');
    this.renderContext.fillStyle = '#000000';
    this.renderContext.fillRect(
      0, 0,
      this.canvasWidth, this.canvasHeight
    );
    this.logger.logDebug('exit clearFrame');
  }
}
