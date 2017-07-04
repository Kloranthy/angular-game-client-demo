import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RenderModule } from './render/render.module';
import { ControlModule } from './control/control.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RenderModule,
    ControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
