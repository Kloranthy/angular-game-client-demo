import { Component } from '@angular/core';

import { LoggingService } from '../../service/logging.service';
import { Logger } from '../../model/logger';

@Component({
  selector: 'app-app-console',
  templateUrl: './app-console.component.html',
  styleUrls: ['./app-console.component.css']
})
export class AppConsoleComponent {
  private logger: Logger = LoggingService.getLogger('AppConsoleComponent');
  // need a way to get log entries to display

  // also need a reference to logging service
  // to allow for configuration via input

  constructor() {
  }

  submitInput(): void {
    // todo
  }
}
