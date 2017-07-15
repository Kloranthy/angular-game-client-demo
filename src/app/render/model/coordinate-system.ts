import { LoggingService } from '../../log/service/logging.service';
import { Logger } from '../../log/model/logger';

import { Camera } from './camera';
import { Vector3 } from './vector3';

export class CoordinateSystem {
  private logger: Logger = LoggingService.getLogger('CoordinateSystem');

  xDirection: Vector3; // represents positive movement along the x axis
  yDirection: Vector3; // represents positive movement along the y axis
  zDirection: Vector3; // represents positive movement along the z axis

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  setXDirection(xDirection: Vector3): void {
    this.logger.logDebug('enter setXDirection');
    this.xDirection = xDirection;
    this.logger.logVerbose(
      'xDirection: ('
      + this.xDirection.x + ', '
      + this.xDirection.y + ', '
      + this.xDirection.z + ')'
    );
    this.logger.logDebug('exit setXDirection');
  }

  setYDirection(yDirection: Vector3): void {
    this.logger.logDebug('enter setYDirection');
    this.yDirection = yDirection;
    this.logger.logVerbose(
      'yDirection: ('
      + this.yDirection.x + ', '
      + this.yDirection.y + ', '
      + this.yDirection.z + ')'
    );
    this.logger.logDebug('exit setYDirection');
  }

  setZDirection(zDirection: Vector3): void {
    this.logger.logDebug('enter setZDirection');
    this.zDirection = zDirection;
    this.logger.logVerbose(
      'zDirection: ('
      + this.zDirection.x + ', '
      + this.zDirection.y + ', '
      + this.zDirection.z + ')'
    );
    this.logger.logDebug('exit setZDirection');
  }

  convertFromWorldToCamera(
    worldVector: Vector3,
    camera: Camera
  ): void {
    this.logger.logDebug('enter convertFromWorldToCamera');
    // todo

    // compare the systems

    // worldCoordinateSystem
    // origin = some tile
    // xDirection = east
    // yDirection = north
    // zDirection = upwards

    // cameraCoordinateSystem
    // origin = viewPortCenterPosition
    // zDirection = out from camera
    // xDirection = camera rightDirection
    // yDirection = camera upDirection

    // cz = (viewPortCenterPositionInWorldCoordinates - cameraPositionInWorldCoordinates)
    //  / (viewPortDistanceInWorldCoordinates)
    // cy = wz
    // cx = cz rotated 90 degrees (or maybe the cross product of cz and cy?)

    // wz = cy
    // wx = ???
    // wy = ???

    // first translate/move to align origins
    // then rotate
    this.logger.logDebug('exit convertFromWorldToCamera');
  }

  // camera to viewport?

  convertFromCameraToScreen(): void {
    this.logger.logDebug('enter convertFromCameraToScreen');
    // todo

    // compare the systems

    // cameraCoordinateSystem
    // origin = viewPortCenterPosition
    // zDirection = out from camera
    // xDirection = camera rightDirection
    // yDirection = camera upDirection

    // screenCoordinateSystem
    // origin = top left corner of screen
    // xDirection = right
    // yDirection = down (reverse of camera)
    // zDirection = out? (reverse of camera?)
    // does it matter? screen z will not be used?

    // sx = cx
    // sy = -cy

    // scale
    this.logger.logDebug('exit convertFromCameraToScreen');
  }
}
