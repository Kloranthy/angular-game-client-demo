import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputProcessorService } from './service/input-processor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [ InputProcessorService ]
})
export class ControlModule { }
