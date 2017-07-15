import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Tile } from './tile';
import { Entity } from './entity';

export class Scene {
  private logger: Logger = LoggingService.getLogger('Scene');

  // todo add camera reference?

  visibleTiles: Tile[];
  visibleEntities: Entity[];

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  /**
    checks if the scene contains the entity
  */
  containsEntity(entity: Entity): boolean {
    this.logger.logDebug('enter containsEntity');
    let entityId: string;
    let found: boolean;
    entityId = entity.getEntityId();
    found = this.containsEntityWithId(entityId);
    this.logger.logDebug('exit containsEntity');
    return found;
  }
  /**
    checks if the scene contains the entity using the id
  */
  containsEntityWithId(entityId: string): boolean {
    this.logger.logDebug('enter containsEntityWithId');
    for(let i: number = 0; i < this.visibleEntities.length; i++) {
      if(this.visibleEntities[i].getEntityId() === entityId) {
        this.logger.logDebug('exit containsEntityWithId');
        return true;
      }
    }
    this.logger.logDebug('exit containsEntityWithId');
    return false;
  }
  /**
    adds the entity to the scene if the scene does not
    already contain the entity
  */
  addEntity(entity: Entity): void {
    this.logger.logDebug('enter addEntity');
    if(this.containsEntity(entity)) {
      this.logger.logVerbose('entity already present in scene');
      this.logger.logDebug('exit addEntity');
      return;
    }
    this.visibleEntities.push(entity);
    this.logger.logVerbose('entity added to scene');
    this.logger.logDebug('exit addEntity');
  }
  removeEntity(entity: Entity): void {
    if(!this.containsEntity(entity)) {
      this.logger.logVerbose('entity not present in scene');
      this.logger.logDebug('exit removeEntity');
      return;
    }
    // todo remove the entity from visible entities
    this.visibleEntities
    this.logger.logVerbose('entity removed from scene');
    this.logger.logDebug('exit removeEntity');
  }

  containsTile(tile: Tile): boolean {
    let tileId: string;
    let found: boolean;
    tileId = tile.getTileId();
    found = this.containsTileWithId(tileId);
    return found;
  }
  containsTileWithId(tileId: string): boolean {
    for(let i: number = 0; i < this.visibleTiles.length; i++) {
      if(this.visibleTiles[i].getTileId() === tileId) {
        return true;
      }
    }
    return false;
  }
  addTile(): void {}
  removeTile(): void {}

  /**
    converts the scene from world coordinates to camera coordinates
  */
  convertToCameraCoordinates(): void {}

  /**
    sorts the tiles and entities by their distance from the camera (z)
  */
  sort(): void {}
}
