import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './component/canvas/canvas.component';

import { RenderService } from './service/render.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CanvasComponent
  ],
  exports: [
    CanvasComponent
  ],
  providers: [ RenderService ]
})
export class RenderModule {
}
