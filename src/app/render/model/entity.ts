export class Entity {
  entityId: string;

  constructor() {
    //console.log('Entity enter constructor');
    //console.log('Entity exit constructor');
  }

  getEntityId(): string {
    console.log('Entity enter getEntityId');
    console.log('entityId: ' + this.entityId);
    console.log('Entity exit getEntityId');
    return this.entityId;
  }

  setEntityId(entityId: string): void {
    console.log('Entity enter setEntityId');
    this.entityId = entityId;
    console.log('entityId: ' + this.entityId);
    console.log('Entity exit setEntityId');
  }
}
