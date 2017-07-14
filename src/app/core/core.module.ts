import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './service/logging.service';
import { ApiService } from './service/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ LoggingService, ApiService ]
})
export class CoreModule {}
