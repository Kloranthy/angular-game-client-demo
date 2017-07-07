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

  constructor() {
    this.onControlPressed = new EventEmitter<string>();
  }

  resize(
    width: number,
    height: number
  ): void {
    console.log('RightControlComponent enter resize');
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
    console.log('RightControlComponent exit resize');
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

  mapTest(): void {
    console.log('map test pressed');
    this.onControlPressed.emit('map test');
  }
}
