import { Injectable } from '@angular/core';

import { Camera } from '../../render/model/camera';
import { Map } from '../../render/model/map';

@Injectable()
export class InputProcessorService {
  // putting camera and map in here for now
  // so that input processor has access
  // may remove later
  camera: Camera;

  map: Map;


  constructor() {
    console.log('InputProcessorService enter constructor');
    console.log('InputProcessorService exit constructor');
  }

  setCamera(camera: Camera) {
    console.log('InputProcessorService enter setCamera');
    this.camera = camera;
    console.log('InputProcessorService exit setCamera');
  }

  setMap(map: Map) {
    console.log('InputProcessorService enter setMap');
    this.map = map;
    console.log('InputProcessorService exit setMap');
  }

  process(input: string): void {
    console.log('InputProcessorService enter process');
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
        if(this.camera) {
          this.camera.renderFrame();
        }
        else {
          console.log('error: camera not set in input processor');
        }
        break;
      case 'map test' :
        if(this.map) {
          this.map.generate();
        }
        else {
          console.log('error: map not set in input processor');
        }
        break;
    }
    console.log('InputProcessorService exit process');
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
