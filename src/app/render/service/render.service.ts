import { Injectable } from '@angular/core';

import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

@Injectable()
export class RenderService {
  logger: Logger = LoggingService.getLogger('RenderService');

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  /*
  todo planning for render service
  what responsibilities to have?
    register camera
      pass a reference to a camera
      to extract from 'scenes' from world to be rendered

    register display canvas
      pass the service a reference to a canvas
      to draw rendered frames onto

    calculation of view frustum?

    rendering of camera view
      calculate visible tiles?
      (for now, in non prototype version server will calculate visible frustum and only send visible tiles to client)
      sort visible tiles by distance from camera
      draw tiles onto buffer canvas
      sort visible entities by distance from camera
      draw visible entities onto buffer canvas
      copy buffer canvas onto display canvas

    adjustment of camera?
      rotation and positioning
      field of view and aspect ratio
      view port distance and visible distance

  what methods to have to accomplish those responsibilities?
  renderFrame
  */
}
