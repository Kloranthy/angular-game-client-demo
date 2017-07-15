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

  decreaseFieldOfView(): void {
    this.logger.logDebug('enter decreaseFieldOfView');
    this.logger.logDebug('exit decreaseFieldOfView');
  }

  increaseFieldOfView(): void {
    this.logger.logDebug('enter increaseFieldOfView');
    this.logger.logDebug('exit increaseFieldOfView');
  }

  decreaseViewPortAspectRatio(): void {
    this.logger.logDebug('enter decreaseViewPortAspectRatio');
    this.logger.logDebug('exit decreaseViewPortAspectRatio');
  }

  increaseViewPortAspectRatio(): void {
    this.logger.logDebug('enter increaseViewPortAspectRatio');
    this.logger.logDebug('exit increaseViewPortAspectRatio');
  }
}
