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
  camera: Camera;

  canvasWidth: number = 800;
  canvasHeight: number = 600;
  @ViewChild('canvas') canvas: ElementRef;
  renderContext: CanvasRenderingContext2D;

  constructor() {
    this.camera = new Camera();
  }

  ngAfterViewInit(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    canvasElement.width = this.canvasWidth;
    canvasElement.height = this.canvasHeight;
    this.renderContext = canvasElement.getContext('2d');
  }

}
