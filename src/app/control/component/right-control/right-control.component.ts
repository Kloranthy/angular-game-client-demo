import { Component, EventEmitter, Output } from '@angular/core';

import { LoggingService } from '../../../log/service/logging.service';
import { Logger } from '../../../log/model/logger';

@Component({
  selector: 'right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.css']
})
export class RightControlComponent {
  private logger: Logger = LoggingService.getLogger('RightControlComponent');

  @Output() onControlPressed;
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
      return;
    }
    if(height <= 0) {
      this.logger.logError('height must be positive');
      return;
    }
    this.width = width;
    this.logger.logVerbose('width: ' + this.width);
    this.height = height;
    this.logger.logVerbose('height: ' + this.height);
    this.logger.logDebug('exit resize');
  }

  turnRight(): void {
    this.logger.logDebug('enter turnRight');
    this.logger.logVerbose('turn right pressed');
    this.onControlPressed.emit('turn right');
    this.logger.logDebug('exit turnRight');
  }

  targetRight(): void {
    this.logger.logDebug('enter targetRight');
    this.logger.logVerbose('target right pressed');
    this.onControlPressed.emit('target right');
    this.logger.logDebug('exit targetRight');
  }

  renderTest():void {
    this.logger.logDebug('enter renderTest');
    this.logger.logVerbose('render test pressed');
    this.onControlPressed.emit('render test');
    this.logger.logDebug('exit renderTest');
  }

  mapTest(): void {
    this.logger.logDebug('enter mapTest');
    this.logger.logVerbose('map test pressed');
    this.onControlPressed.emit('map test');
    this.logger.logDebug('exit mapTest');
  }
}
