import {
  Component, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

import { CanvasComponent } from './render/component/canvas/canvas.component';

import { LeftControlComponent } from './control/component/left-control/left-control.component';
import { RightControlComponent } from './control/component/right-control/right-control.component';

import { InputProcessorService } from './control/service/input-processor.service';

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
    private inputProcessor: InputProcessorService
  ) {
    console.log('AppComponent enter constructor');
    console.log('AppComponent exit constructor');
  }

  ngAfterViewInit(): void {
    console.log('AppComponent enter ngAfterViewInit');
    this.camera = new Camera();
    this.camera.canvasComponent = this.canvas;
    this.camera.calculateViewFrustum();
    this.map = new Map();
    this.inputProcessor.setCamera(this.camera);
    this.inputProcessor.setMap(this.map);
    this.calculateElementDimensions();
    this.resizeElements();
    console.log('AppComponent exit ngAfterViewInit');
  }

  onControlPressed(input: string): void {
    this.inputProcessor.process(input);
  }

  renderTest():void {
    console.log('AppComponent render test processed');
    this.renderFrame();
  }

  renderFrame(): void {
    console.log('AppComponent enter renderFrame');
    this.camera.renderFrame();
    console.log('AppComponent exit renderFrame');
  }

  calculateElementDimensions() {
    console.log('AppComponent enter calculateElementDimensions');
    this.windowWidth = window.innerWidth ;
    this.windowHeight = window.innerHeight;
    const windowAspectRatio = this.windowWidth / this.windowHeight;
    console.log('windowWidth: ' + this.windowWidth);
    console.log('windowHeight: ' + this.windowHeight);
    console.log('windowAspectRatio: ' + windowAspectRatio);

    if(windowAspectRatio > 1) {
      console.log('landscape mode');
      console.log('placing controls beside canvas');
      console.log('removing 200 from window width for controls');
      this.canvasWidth = this.windowWidth - 200;
      this.canvasHeight = this.windowHeight;

      this.controlWidth = 100;
      this.controlHeight = this.windowHeight;
    }
    else {
      console.log('portrait mode');
      console.log('placing controls below canvas');
      // todo consider revising to have canvas height be based on viewport aspect ratio
      this.canvasWidth = this.windowWidth;
      this.canvasHeight = Math.floor(this.windowHeight / 2);

      this.controlWidth = Math.floor(this.windowWidth / 2);
      this.controlHeight = Math.floor(this.windowHeight / 2);
    }
    console.log('canvasWidth: ' + this.canvasWidth);
    console.log('canvasHeight: ' + this.canvasHeight);

    console.log('controlWidth: ' + this.controlWidth);
    console.log('controlHeight: ' + this.controlHeight);
    this.resizeElements();
    console.log('AppComponent exit calculateElementDimensions');
  }

  private resizeElements(): void {
    console.log('AppComponent enter resizeElements');
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
    console.log('AppComponent exit resizeElements');
  }


}
