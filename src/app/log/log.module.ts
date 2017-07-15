import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConsoleComponent } from './component/app-console/app-console.component';

import { LoggingService } from './service/logging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ AppConsoleComponent ],
  providers: [ LoggingService]
})
export class LogModule { }
