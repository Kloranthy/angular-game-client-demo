import { Injectable } from '@angular/core';

import { RenderService } from '../../render/service/render.service';

@Injectable()
export class InputProcessorService {
  
  private renderService: RenderService
  // todo keybinding stuff

  constructor(
    renderService: RenderService
  ) {
    this.renderService = renderService;
  }

  process( input: string ): void {
  }
}
