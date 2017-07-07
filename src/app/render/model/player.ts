import { Entity } from './entity';

export class Player extends Entity {

  constructor() {
    console.log('Player enter constructor');
    super();
    console.log('Player exit constructor');
  }
}
