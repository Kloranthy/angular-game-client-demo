import {
  Component, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent {
  @Output() onControlPressed: EventEmitter<string>;
  width: number;
  height: number;

  constructor() {
    console.log('LeftControlComponent enter constructor');
    this.onControlPressed = new EventEmitter<string>();
    console.log('LeftControlComponent exit constructor');
  }

  resize(
    width: number,
    height: number
  ): void {
    console.log('LeftControlComponent enter resize');
    if(width <= 0) {
      console.log('error: width must be positive');
      return;
    }
    if(height <= 0) {
      console.log('error: height must be positive');
      return;
    }
    this.width = width;
    this.height = height;
    console.log('LeftControlComponent left-control exit resize');
  }

  turnLeft(): void {
    console.log('turn left pressed');
    this.onControlPressed.emit('turn left');
  }

  targetLeft(): void {
    console.log('target left pressed');
    this.onControlPressed.emit('target left');
  }

  moveForward(): void {
    console.log('move forward pressed');
    this.onControlPressed.emit('move forward');
  }
  moveLeft(): void {
    console.log('move left pressed');
    this.onControlPressed.emit('move left');
  }
  moveRight(): void {
    console.log('move right pressed');
    this.onControlPressed.emit('move right');
  }
  moveBackward(): void {
    console.log('move back pressed');
    this.onControlPressed.emit('move back');
  }
}
