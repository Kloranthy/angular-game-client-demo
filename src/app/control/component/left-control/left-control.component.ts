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
    this.width = 80;
    this.height = 400;
    this.onControlPressed = new EventEmitter<string>();
  }

  resize(
    width: number,
    height: number
  ): void {
    if(width <= 0) {
      return;
    }
    if(height <= 0) {
      return;
    }
    this.width = width;
    this.height = height;
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
