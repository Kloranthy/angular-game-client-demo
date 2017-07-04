import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent {
  @Output() onControlPressed; // todo have controls emit events to parent

  constructor() {
    this.onControlPressed = new EventEmitter<string>();
  }

  turnLeft(): void {
    console.log('turn left pressed');
    this.onControlPressed.emit('turn left pressed');
  }

  targetLeft(): void {
    console.log('target left pressed');
    this.onControlPressed.emit('target left pressed');
  }

  moveForward(): void {
    console.log('move forward pressed');
    this.onControlPressed.emit('move forward pressed');
  }
  moveLeft(): void {
    console.log('move left pressed');
    this.onControlPressed.emit('move left pressed');
  }
  moveRight(): void {
    console.log('move right pressed');
    this.onControlPressed.emit('move right pressed');
  }
  moveBackward(): void {
    console.log('move back pressed');
    this.onControlPressed.emit('move back pressed');
  }
}
