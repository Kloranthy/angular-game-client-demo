import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RenderModule } from './render/render.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
