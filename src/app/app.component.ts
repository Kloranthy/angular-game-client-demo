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
  windowWidth: number; // the width of the window
  windowHeight: number; // the height of the window

  camera: Camera; // todo description

  map: Map; // todo description

  minControlWidth: number; // the minimum width of the control containers
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
    private loggingService: LoggingService,
    private inputProcessor: InputProcessorService
  ) {
    this.loggingService.logDebug(
      'AppComponent',
      'enter constructor'
    );
    this.loggingService.logDebug(
      'AppComponent',
      'exit constructor'
    );
  }

  ngAfterViewInit(): void {
    this.loggingService.logDebug(
      'AppComponent',
      'enter ngAfterViewInit'
    );
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
    this.loggingService.logDebug(
      'AppComponent',
      'exit ngAfterViewInit'
    );
  }

  onControlPressed(input: string): void {
    this.loggingService.logDebug(
      'AppComponent',
      'enter onControlPressed'
    );
    this.inputProcessor.process(input);
    this.loggingService.logDebug(
      'AppComponent',
      'exit onControlPressed'
    );
  }

  renderTest():void {
    this.loggingService.logDebug(
      'AppComponent',
      'enter renderTest'
    );
    this.renderFrame();
    this.loggingService.logDebug(
      'AppComponent',
      'exit renderTest'
    );
  }

  renderFrame(): void {
    this.loggingService.logDebug(
      'AppComponent',
      'enter renderFrame'
    );
    this.camera.renderFrame();
    this.loggingService.logDebug(
      'AppComponent',
      'exit renderFrame'
    );
  }

  calculateElementDimensions() {
    this.loggingService.logDebug(
      'AppComponent',
      'enter calculateElementDimensions'
    );
    this.windowWidth = window.innerWidth ;
    this.windowHeight = window.innerHeight;
    const windowAspectRatio = this.windowWidth / this.windowHeight;
    this.loggingService.logVerbose(
      'AppComponent',
      'windowWidth: ' + this.windowWidth
    );
    this.loggingService.logVerbose(
      'AppComponent',
      'windowHeight: ' + this.windowHeight
    );
    this.loggingService.logVerbose(
      'AppComponent',
      'windowAspectRatio: ' + windowAspectRatio
    );

    if(windowAspectRatio > 1) {
      this.loggingService.logVerbose(
        'AppComponent',
        'landscape mode'
      );
      this.loggingService.logVerbose(
        'AppComponent',
        'placing controls beside canvas'
      );
      this.loggingService.logVerbose(
        'AppComponent',
        'removing 200 from window width for controls'
      );
      this.canvasWidth = this.windowWidth - 200;
      this.canvasHeight = this.windowHeight;

      this.controlWidth = 100;
      this.controlHeight = this.windowHeight;
    }
    else {
      this.loggingService.logVerbose(
        'AppComponent',
        'portrait mode'
      );
      this.loggingService.logVerbose(
        'AppComponent',
        'placing controls below canvas'
      );
      // todo consider revising to have canvas height be based on viewport aspect ratio
      this.canvasWidth = this.windowWidth;
      this.canvasHeight = Math.floor(this.windowHeight / 2);

      this.controlWidth = Math.floor(this.windowWidth / 2);
      this.controlHeight = Math.floor(this.windowHeight / 2);
    }
    this.loggingService.logVerbose(
      'AppComponent',
      'canvasWidth: ' + this.canvasWidth
    );
    this.loggingService.logVerbose(
      'AppComponent',
      'canvasHeight: ' + this.canvasHeight
    );

    this.loggingService.logVerbose(
      'AppComponent',
      'controlWidth: ' + this.controlWidth
    );
    this.loggingService.logVerbose(
      'AppComponent',
      'controlHeight: ' + this.controlHeight
    );
    this.loggingService.logDebug(
      'AppComponent',
      'exit calculateElementDimensions'
    );
  }

  private resizeElements(): void {
    this.loggingService.logDebug(
      'AppComponent',
      'enter resizeElements'
    );
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
    this.loggingService.logDebug(
      'AppComponent',
      'exit resizeElements'
    );
  }


}
