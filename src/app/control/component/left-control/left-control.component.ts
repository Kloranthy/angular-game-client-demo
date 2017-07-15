import {
  Component, EventEmitter, Output
} from '@angular/core';

import { LoggingService } from '../../../log/service/logging.service';
import { Logger } from '../../../log/model/logger';

@Component({
  selector: 'left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent {
  private logger: Logger = LoggingService.getLogger('LeftControlComponent');

  @Output() onControlPressed: EventEmitter<string>;
  width: number;
  height: number;

  constructor() {
    this.logger.logDebug('enter constructor');
    this.onControlPressed = new EventEmitter<string>();
    this.logger.logDebug('exit constructor');
  }

  resize(
    width: number,
    height: number
  ): void {
    this.logger.logDebug('enter resize');
    if(width <= 0) {
      this.logger.logError('width must be positive');
      this.logger.logDebug('exit resize');
      return;
    }
    if(height <= 0) {
      this.logger.logError('height must be positive');
      this.logger.logDebug('exit resize');
      return;
    }
    this.width = width;
    this.logger.logVerbose('width: ' + this.width);
    this.height = height;
    this.logger.logVerbose('height: ' + this.height);
    this.logger.logDebug('exit resize');
  }

  turnLeft(): void {
    this.logger.logDebug('enter turnLeft');
    this.logger.logVerbose('turn left pressed');
    this.onControlPressed.emit('turn left');
    this.logger.logDebug('exit turnLeft');
  }

  targetLeft(): void {
    this.logger.logDebug('enter targetLeft');
    this.logger.logVerbose('target left pressed');
    this.onControlPressed.emit('target left');
    this.logger.logDebug('exit targetLeft');
  }

  moveForward(): void {
    this.logger.logDebug('enter moveForward');
    this.logger.logVerbose('move forward pressed');
    this.onControlPressed.emit('move forward');
    this.logger.logDebug('exit moveForward');
  }
  moveLeft(): void {
    this.logger.logDebug('enter moveLeft');
    this.logger.logVerbose('move left pressed');
    this.onControlPressed.emit('move left');
    this.logger.logDebug('exit moveLeft');
  }
  moveRight(): void {
    this.logger.logDebug('enter moveRight');
    this.logger.logVerbose('move right pressed');
    this.onControlPressed.emit('move right');
    this.logger.logDebug('exit moveRight');
  }
  moveBackward(): void {
    this.logger.logDebug('enter moveBackward');
    this.logger.logVerbose('move back pressed');
    this.onControlPressed.emit('move back');
    this.logger.logDebug('exit moveBackward');
  }
}
