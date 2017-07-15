import { LoggingService } from '../../log/service/logging.service';
import { Logger } from '../../log/model/logger';

export class Tile {
  private logger: Logger = LoggingService.getLogger('Tile');

  tileId: string;
  // todo have multiple sprites, retrieve based on view angle?
  image: string;
  // todo proper entity-location interaction

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  getTileId(): string {
    this.logger.logDebug('enter getTileId');
    this.logger.logVerbose('tileId: ' + this.tileId);
    this.logger.logDebug('exit getTileId');
    return this.tileId;
  }

  setTileId(tileId: string): void {
    this.logger.logDebug('enter setTileId');
    this.tileId = tileId;
    this.logger.logVerbose('tileId: ' + this.tileId);
    this.logger.logDebug('exit getTileId');
  }
}
