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
  logger: Logger = LoggingService.getLogger('ApiService');

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  /*
  planning:
  responsibilities:
  get scene
    returns a list of visible tiles and entities to be rendered
    the scene should be in camera coordinates for easy rendering

  submit command/action
    sends user input to server to be processed

  get turn results (current game state?)
    returns the results of the most recent turn to be displayed

  login and logout and all that jazz later

  methods:

  */
}
