import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './service/logging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ LoggingService ]
})
export class CoreModule {}
