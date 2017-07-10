import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Entity } from './entity';

export class Player extends Entity {
  logger: Logger = LoggingService.getLogger('Player');

  constructor() {
    super();
    this.logger.logDebug('enter constructor after super');
    this.logger.logDebug('exit constructor');
  }
}
