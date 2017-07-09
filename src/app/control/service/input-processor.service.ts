import { Injectable } from '@angular/core';

import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Camera } from '../../render/model/camera';
import { Map } from '../../render/model/map';

@Injectable()
export class InputProcessorService {
  logger: Logger = LoggingService.getLogger('InputProcessorService');

  // putting camera and map in here for now
  // so that input processor has access
  // may remove later
  camera: Camera;

  map: Map;


  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  setCamera(camera: Camera) {
    this.logger.logDebug('enter setCamera');
    this.camera = camera;
    this.logger.logDebug('exit setCamera');
  }

  setMap(map: Map) {
    this.logger.logDebug('enter setMap');
    this.map = map;
    this.logger.logDebug('exit setMap');
  }

  process(input: string): void {
    this.logger.logDebug('enter process');
    this.logger.logVerbose('input: ' + input);
    switch(input) {
      case 'move forward' :
        this.moveForward();
      break;
      case 'move left' :
        this.moveLeft();
        break;
      case 'move right' :
        this.moveRight();
        break;
      case 'move back' :
        this.moveBackward();
        break;
      case 'turn left' :
        this.turnLeft();
        break;
      case 'turn right' :
        this.turnRight();
        break;
      case 'target left' :
        this.targetLeft();
        break;
      case 'target right' :
        this.targetRight();
        break;
      case 'render test' :
        if(this.camera) {
          this.camera.renderFrame();
        }
        else {
          this.logger.logError('camera not set in input processor');
        }
        break;
      case 'map test' :
        if(this.map) {
          this.map.generate();
        }
        else {
          this.logger.logError('map not set in input processor');
        }
        break;
    }
    this.logger.logDebug('exit process');
  }

  moveForward(): void {
    this.logger.logDebug('enter moveForward');
    this.logger.logVerbose('move forward processed');
    this.logger.logDebug('exit moveForward');
  }
  moveLeft(): void {
    this.logger.logDebug('enter moveLeft');
    this.logger.logVerbose('move left processed');
    this.logger.logDebug('exit moveLeft');
  }
  moveRight(): void {
    this.logger.logDebug('enter moveRight');
    this.logger.logVerbose('move right processed');
    this.logger.logDebug('exit moveRight');
  }
  moveBackward(): void {
    this.logger.logDebug('enter moveBackward');
    this.logger.logVerbose('move back processed');
    this.logger.logDebug('exit moveBackward');
  }

  turnLeft(): void {
    this.logger.logDebug('enter turnLeft');
    this.logger.logVerbose('turn left processed');
    this.logger.logDebug('exit turnLeft');
  }

  targetLeft(): void {
    this.logger.logDebug('enter targetLeft');
    this.logger.logVerbose('target left processed');
    this.logger.logDebug('exit targetLeft');
  }

  turnRight(): void {
    this.logger.logDebug('enter turnRight');
    this.logger.logVerbose('turn right processed');
    this.logger.logDebug('exit turnRight');
  }

  targetRight(): void {
    this.logger.logDebug('enter targetRight');
    this.logger.logVerbose('target right processed');
    this.logger.logDebug('exit targetRight');
  }
}
