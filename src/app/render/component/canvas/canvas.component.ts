import {
  Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { LoggingService } from '../../../core/service/logging.service';
import { Logger } from '../../../core/model/logger';

import { RenderService } from '../../service/render.service';
import { Camera } from '../../model/camera';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  logger: Logger = LoggingService.getLogger('CanvasComponent');

  @ViewChild('canvas') canvas: ElementRef;

  constructor(
    private renderService: RenderService
  ) {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  ngAfterViewInit(): void {
    this.logger.logDebug('enter ngAfterViewInit');
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.renderService.setDisplayCanvas(canvasElement);
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
    this.renderService.resizeDisplayCanvas(
      width,
      height
    );
    this.logger.logVerbose('canvas resized');
    this.logger.logDebug('exit resizeCanvas');
  }
}
