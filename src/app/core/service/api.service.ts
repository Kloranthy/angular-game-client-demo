import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { LoggingService } from './logging.service';
import { Logger } from '../model/logger';

/**
  the API Service receives calls from the domain services and forwards them
  to the server or to the mock server to be handled.
  the purpose of this class it to hide the implementation (server vs mock) from the domain services
*/
@Injectable()
export class ApiService {
  private logger: Logger = LoggingService.getLogger('ApiService');

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  /*
  planning:
  responsibilities:
  get current turn
    returns the current turn number so that clients can tell when there are new results

  get scene
    returns a list of visible tiles and entities to be rendered
    the scene should be in camera coordinates for easy rendering

  submit command/action
    sends user input to server to be processed

  get turn results (current game state?)
    returns the results of the most recent turn to be displayed

  login and logout and all that jazz later
  */

  getScene(): void {
    this.logger.logDebug('enter getScene');
    // todo
    // http request for scene
    // receive data model (foreign key references)
    // convert to domain model (object references)
    // return scene
    this.logger.logDebug('exit getScene');
  }
}
