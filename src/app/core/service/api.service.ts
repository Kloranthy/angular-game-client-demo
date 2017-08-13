import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
  the API Service receives calls from the domain services and forwards them
  to the server or to the mock server to be handled.
  the purpose of this class it to hide the implementation (server vs mock) from the domain services
*/
@Injectable()
export class ApiService {

  constructor() {
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
  }
}
