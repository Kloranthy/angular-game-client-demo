import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftControlComponent } from './component/left-control/left-control.component';
import { RightControlComponent } from './component/right-control/right-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LeftControlComponent,
    RightControlComponent
  ],
  exports: [
    LeftControlComponent,
    RightControlComponent
  ]
})
export class ControlModule { }
