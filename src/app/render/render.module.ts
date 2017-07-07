import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './component/canvas/canvas.component';
import { CameraControlComponent } from './component/camera-control/camera-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CanvasComponent,
    CameraControlComponent
  ],
  exports: [
    CanvasComponent
  ]
})
export class RenderModule { }
