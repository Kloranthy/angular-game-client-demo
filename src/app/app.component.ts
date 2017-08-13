import {
  Component, ElementRef, ViewChild
} from '@angular/core';

import { InputProcessorService } from './control/service/input-processor.service';

import { CanvasComponent } from './render/component/canvas/canvas.component';

import { Camera } from './render/model/camera';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  windowWidth: number; // the width of the window
  windowHeight: number; // the height of the window

  camera: Camera; // todo description

  controlWidth: number;
  controlHeight: number;

  canvasWidth: number; // the width of the canvas
  canvasHeight: number; // the height of the canvas

  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  constructor(
    private inputProcessor: InputProcessorService
  ) {
  }

}
