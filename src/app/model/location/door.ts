import { Transform } from './transform';
import { Portal } from './portal';

export class Door {
  private doorId: string;
  private isOpen: boolean;
  private image: string;
  private transform: Transform;
  private portal: Portal;
  private connectedDoor: Door;

  public constructor() {}

  // initialization

  // modification

  public open() {
    if ( !this.isOpen && this.portal ) {
      this.isOpen = true;
    }
  }

  public close() {
    if ( this.isOpen ) {
      this.isOpen = false;
    }
  }
}

  // products
