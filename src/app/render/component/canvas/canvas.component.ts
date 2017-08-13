import {
  Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import { RenderService } from '../../service/render.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor(
    private renderService: RenderService
  ) {
  }

  ngAfterViewInit(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.renderService.setDisplayCanvas(canvasElement);
  }


  resize(
    width: number,
    height: number
  ): void {
    if (width <= 0) {
      return;
    }
    if (height <= 0) {
      return;
    }
    this.renderService.resizeDisplayCanvas(
      width,
      height
    );
  }
}
