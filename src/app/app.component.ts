import {
  Component, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

import { LoggingService } from './core/service/logging.service';
import { Logger } from './core/model/logger';

import { LeftControlComponent } from './control/component/left-control/left-control.component';
import { RightControlComponent } from './control/component/right-control/right-control.component';
import { InputProcessorService } from './control/service/input-processor.service';

import { CanvasComponent } from './render/component/canvas/canvas.component';

import { Camera } from './render/model/camera';
import { Map } from './render/model/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  logger: Logger = LoggingService.getLogger('AppComponent');
  windowWidth: number; // the width of the window
  windowHeight: number; // the height of the window

  camera: Camera; // todo description

  map: Map; // todo description

  controlWidth: number;
  controlHeight: number;

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild(LeftControlComponent)
  leftControl: LeftControlComponent;

  @ViewChild(RightControlComponent)
  rightControl: RightControlComponent;

  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  constructor(
    private inputProcessor: InputProcessorService
  ) {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  ngAfterViewInit(): void {
    this.logger.logDebug('enter ngAfterViewInit');
    // create the camera
    this.camera = new Camera();
    this.camera.setCanvasComponent(this.canvas);
    // create the map
    this.map = new Map();
    this.map.hardCodedDemo();
    this.map.placeCameraHardCodedDemo(this.camera);
    // pass references to the input processor
    this.inputProcessor.setCamera(this.camera);
    this.inputProcessor.setMap(this.map);
    // resize the ui elements
    this.calculateElementDimensions()
    this.resizeElements();
    // todo add a periodic check for change in window dimensions
    this.logger.logDebug('exit ngAfterViewInit');
  }

  onControlPressed(input: string): void {
    this.logger.logDebug('enter onControlPressed');
    this.inputProcessor.process(input);
    this.logger.logDebug('exit onControlPressed');
  }

  renderTest():void {
    this.logger.logDebug('enter renderTest');
    this.renderFrame();
    this.logger.logDebug('exit renderTest');
  }

  renderFrame(): void {
    this.logger.logDebug('enter renderFrame');
    this.camera.renderFrame();
    this.logger.logDebug('exit renderFrame');
  }

  calculateElementDimensions() {
    this.logger.logDebug('enter calculateElementDimensions');
    this.windowWidth = window.innerWidth ;
    this.windowHeight = window.innerHeight;
    const windowAspectRatio = this.windowWidth / this.windowHeight;
    this.logger.logVerbose('windowWidth: ' + this.windowWidth);
    this.logger.logVerbose('windowHeight: ' + this.windowHeight);
    this.logger.logVerbose('windowAspectRatio: ' + windowAspectRatio);

    if(windowAspectRatio > 1) {
      this.logger.logInfo('landscape mode');
      this.logger.logVerbose('placing controls beside canvas');
      this.logger.logVerbose('removing 200 from window width for controls');
      this.canvasWidth = this.windowWidth - 200;
      this.canvasHeight = this.windowHeight;

      this.controlWidth = 100;
      this.controlHeight = this.windowHeight;
    }
    else {
      this.logger.logInfo('portrait mode');
      this.logger.logVerbose('placing controls below canvas');
      // todo consider revising to have canvas height be based on viewport aspect ratio
      this.canvasWidth = this.windowWidth;
      this.canvasHeight = Math.floor(this.windowHeight / 2);

      this.controlWidth = Math.floor(this.windowWidth / 2);
      this.controlHeight = Math.floor(this.windowHeight / 2);
    }
    this.logger.logVerbose('canvasWidth: ' + this.canvasWidth);
    this.logger.logVerbose('canvasHeight: ' + this.canvasHeight);

    this.logger.logVerbose('controlWidth: ' + this.controlWidth);
    this.logger.logVerbose('controlHeight: ' + this.controlHeight);
    this.logger.logDebug('exit calculateElementDimensions');
  }

  private resizeElements(): void {
    this.logger.logDebug('enter resizeElements');
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
    setTimeout(
      () => this.canvas.viewPortAspectRatio = this.camera.viewPortAspectRatio,
      0
    );
    setTimeout(
      () => this.canvas.resize(
        this.canvasWidth,
        this.canvasHeight
      ),
      0
    );
    this.logger.logDebug('exit resizeElements');
  }


}
