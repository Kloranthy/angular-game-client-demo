import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.css']
})
export class RightControlComponent {
  @Output() onControlPressed; // todo have controls emit events to parent

  constructor() {
    this.onControlPressed = new EventEmitter<string>();
  }

  turnRight(): void {
    console.log('turn right pressed');
    this.onControlPressed.emit('turn right pressed');
  }

  targetRight(): void {
    console.log('target right pressed');
    this.onControlPressed.emit('target right pressed');
  }

  renderTest():void {
    //this.renderFrame();
      console.log('render test pressed');
    this.onControlPressed.emit('render test pressed');
  }

}
