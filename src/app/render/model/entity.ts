import { LoggingService } from '../../log/service/logging.service';
import { Logger } from '../../log/model/logger';

export class Entity {
  private logger: Logger = LoggingService.getLogger('Entity');

  entityId: string;

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  getEntityId(): string {
    this.logger.logDebug('enter getEntityId');
    this.logger.logVerbose('entityId: ' + this.entityId);
    this.logger.logDebug('exit getEntityId');
    return this.entityId;
  }

  setEntityId(entityId: string): void {
    this.logger.logDebug('enter setEntityId');
    this.entityId = entityId;
    this.logger.logVerbose('entityId: ' + this.entityId);
    this.logger.logDebug('exit setEntityId');
  }
}
