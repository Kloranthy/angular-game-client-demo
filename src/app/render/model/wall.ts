import { Entity } from './entity';

export class Wall extends Entity {
  // todo have multiple sprites, retrieve based on view angle
  image: string;

  constructor() {
    //console.log('Wall enter constructor');
    super();
    //console.log('Wall exit constructor');
  }

  getWallId(): string {
    //console.log('Wall enter getEntityId');
    return super.getEntityId();
  }

  setWallId(wallId: string): void {
    //console.log('Wall enter setEntityId');
    super.setEntityId(wallId);
  }
}
