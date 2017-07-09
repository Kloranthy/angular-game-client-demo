import { Component } from '@angular/core';

import { LoggingService } from '../../../core/service/logging.service';
import { Logger } from '../../../core/model/logger';

@Component({
  selector: 'app-camera-control',
  templateUrl: './camera-control.component.html',
  styleUrls: ['./camera-control.component.css']
})
export class CameraControlComponent {
  logger: Logger = LoggingService.getLogger('CameraControlComponent');

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

}
