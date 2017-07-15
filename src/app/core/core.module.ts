import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './service/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ ApiService ]
})
export class CoreModule {}
