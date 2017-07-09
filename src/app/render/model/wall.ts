import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Entity } from './entity';

export class Wall extends Entity {
  logger: Logger = LoggingService.getLogger('Wall');
  // todo have multiple sprites, retrieve based on view angle
  image: string;

  constructor() {
    super();
    this.logger.logDebug('enter constructor after super');
    this.logger.logDebug('exit constructor');
  }

  getWallId(): string {
    this.logger.logDebug('enter getWallId');
    let wallId: string;
    wallId = super.getEntityId();
    this.logger.logVerbose('wallId: ' + wallId);
    this.logger.logDebug('exit getWallId');
    return wallId;
  }

  setWallId(wallId: string): void {
    this.logger.logDebug('enter setWallId');
    super.setEntityId(wallId);
    this.logger.logVerbose('wallId: ' + wallId);
    this.logger.logDebug('exit setWallId');
  }
}
