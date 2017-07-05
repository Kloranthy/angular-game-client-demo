import { Injectable } from '@angular/core';

@Injectable()
export class InputProcessorService {

  constructor() { }

  process(input: string): void {
    console.log(input);
    switch(input) {
      case 'move forward' :
        this.moveForward();
      break;
      case 'move left' :
        this.moveLeft();
        break;
      case 'move right' :
        this.moveRight();
        break;
      case 'move back' :
        this.moveBackward();
        break;
      case 'turn left' :
        this.turnLeft();
        break;
      case 'turn right' :
        this.turnRight();
        break;
      case 'target left' :
        this.targetLeft();
        break;
      case 'target right' :
        this.targetRight();
        break;
      case 'render test' :
        //this.renderTest();
        break;
    }
  }

  moveForward(): void {
    console.log('move forward processed');
  }
  moveLeft(): void {
    console.log('move left processed');
  }
  moveRight(): void {
    console.log('move right processed');
  }
  moveBackward(): void {
    console.log('move back processed');
  }

  turnLeft(): void {
    console.log('turn left processed');
  }

  targetLeft(): void {
    console.log('target left processed');
  }

  turnRight(): void {
    console.log('turn right processed');
  }

  targetRight(): void {
    console.log('target right processed');
  }
}
