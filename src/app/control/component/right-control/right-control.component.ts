import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.css']
})
export class RightControlComponent {
  @Output() onControlPressed;
  width: number;
  height: number;
  order: number;

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

  turnRight(): void {
    console.log('turn right pressed');
    this.onControlPressed.emit('turn right');
  }

  targetRight(): void {
    console.log('target right pressed');
    this.onControlPressed.emit('target right');
  }

  renderTest():void {
    console.log('render test pressed');
    this.onControlPressed.emit('render test');
  }

}
