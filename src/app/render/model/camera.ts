import { LoggingService } from '../../log/service/logging.service';
import { Logger } from '../../log/model/logger';

import { CanvasComponent } from '../component/canvas/canvas.component';

import { Map } from './map';
import { Frustum } from './frustum';
import { Vector3 } from './vector3';

export class Camera {
  private logger: Logger = LoggingService.getLogger('Camera');

  map: Map; // the map the camera is located in

  horizontalFieldOfView: number; // visible angle in degrees
  viewPortAspectRatio: number; // the aspect ratio of the view port
  viewPortDistance: number; // the distance from the camera to the view port center
  visibleDistance: number; // the distance drawn beyond the view port

  viewPortCenterPosition: Vector3; // the position of the center of the view port in world coordinates
  cameraPosition: Vector3; // the position of the camera in world coordinates

  // todo use a coordinate system object to hold the camera up, forward, and right directions
  /**
    represents positive movement along the horizontal axis of the camera coordinate system in relation to the world coordinate system
  */
  xDirection: Vector3;
  /**
    represents positive movement along the vertical axis of the camera coordinate system in relation to the world coordinate system
  */
  yDirection: Vector3;
  /**
    represents positive movement along the forward axis of the camera coordinate system in relation to the world coordinate system
  */
  zDirection: Vector3;

  viewFrustum: Frustum; // frustum representing the view of the camera

  constructor() {
    this.logger.logDebug('enter constructor');
    // set to defaults
    this.horizontalFieldOfView = 90;
    this.viewPortAspectRatio = 1;
    this.viewPortDistance = 8;
    this.visibleDistance = 25;

    this.logger.logDebug('exit constructor');
  }

  // initialization
  /**
    attempts to set all of the internal values
  */
  setInternals(
    horizontalFieldOfView: number,
    viewPortAspectRatio: number,
    viewPortDistance: number,
    visibleDistance: number
  ): Camera {
    this.logger.logDebug('enter setInternals');
    this.setHorizontalFieldOfView(horizontalFieldOfView)
      .setViewPortAspectRatio(viewPortAspectRatio)
      .setViewPortDistance(viewPortDistance)
      .setVisibleDistance(visibleDistance);
    this.logger.logDebug('exit setInternals');
    return this;
  }
  /**
    attempts to set the horizontalFieldOfView

    param: horizontalFieldOfView the new value for horizontalFieldOfView
    return: a reference to this camera for method chaining
  */
  setHorizontalFieldOfView(horizontalFieldOfView: number): Camera {
    this.logger.logDebug('enter setHorizontalFieldOfView');
    if(horizontalFieldOfView <= 0) {
      this.logger.logError('horizontal field of view must be a positive, non-zero value');
      this.logger.logDebug('exit setHorizontalFieldOfView');
      return this;
    }
    if(horizontalFieldOfView >= 180) {
      this.logger.logError('horizontal field of view must be less than 180');
      this.logger.logDebug('exit setHorizontalFieldOfView');
      return this;
    }
    this.horizontalFieldOfView = horizontalFieldOfView;
    this.logger.logVerbose(
      'horizontalFieldOfView: ' + this.horizontalFieldOfView
    );
    this.logger.logDebug('exit setHorizontalFieldOfView');
    return this;
  }

  /**
    attempts to set the viewPortAspectRatio

    param: viewPortAspectRatio the new value for viewPortAspectRatio
    return: a reference to this camera for method chaining
  */
  setViewPortAspectRatio(viewPortAspectRatio: number): Camera {
    this.logger.logDebug('enter setViewPortAspectRatio');
    if(viewPortAspectRatio <= 0) {
      this.logger.logError('view port aspect ratio must be a positive, non-zero value');
      this.logger.logDebug('exit setViewPortAspectRatio');
      return this;
    }
    // todo max view port aspect ratio?
    this.viewPortAspectRatio = viewPortAspectRatio;
    this.logger.logVerbose(
      'viewPortAspectRatio: ' + this.viewPortAspectRatio
    );
    this.logger.logDebug('exit setViewPortAspectRatio');
    return this;
  }

  /**
    attempts to set the viewPortDistance
    param: viewPortDistance the new value for viewPortDistance
    return: a reference to this camera for method chaining
  */
  setViewPortDistance(viewPortDistance: number): Camera {
    this.logger.logDebug('enter setViewPortDistance');
    if(viewPortDistance <= 0) {
      this.logger.logError('view port distance must be a positive number');
      this.logger.logDebug('exit setViewPortDistance');
      return this;
    }
    this.viewPortDistance = viewPortDistance;
    this.logger.logVerbose(
      'viewPortDistance: ' + this.viewPortDistance
    );
    this.logger.logDebug('exit setViewPortDistance');
    return this;
  }

  /**
    attempts to set the visibleDistance
    param: visibleDistance the new value for visibleDistance
    return: a reference to this camera for method chaining
  */
  setVisibleDistance(visibleDistance: number): Camera {
    this.logger.logDebug('enter setVisibleDistance');
    if(visibleDistance <= 0) {
      this.logger.logError('visible distance must be a positive number');
      this.logger.logDebug('exit setVisibleDistance');
      return;
    }
    this.visibleDistance = visibleDistance;
    this.logger.logVerbose(
      'visibleDistance: ' + this.visibleDistance
    );
    this.logger.logDebug('exit setVisibleDistance');
    return this;
  }

  /**
    sets the map the camera is located in
    temporary, will be deprecated/replaced when world/location system is refactored
  */
  setMap(map: Map): Camera {
    this.logger.logDebug('enter setMap');
    this.map = map;
    this.logger.logDebug('exit setMap');
    return this;
  }

  /**
    sets the viewPortCenterPosition
  */
  setViewPortCenterPosition(viewPortCenterPosition: Vector3): Camera {
    this.logger.logDebug('enter setViewPortCenterPosition');
    this.viewPortCenterPosition = viewPortCenterPosition;
    this.logger.logDebug('exit setViewPortCenterPosition');
    return this;
  }

  /**
    sets the cameraPosition
  */
  setCameraPosition(cameraPosition: Vector3): Camera {
    this.logger.logDebug('enter setCameraPosition');
    this.cameraPosition = cameraPosition;
    this.logger.logVerbose(
      'cameraPosition: ('
      + this.cameraPosition.x + ','
      + this.cameraPosition.y + ','
      + this.cameraPosition.z + ')'
    );
    this.logger.logDebug('exit setCameraPosition');
    return this;
  }

  // modification
  // NOTE: shelved until other refactoring is done
  // /**
  //   attempts to update the viewPortDistance
  // */
  // updateViewPortDistance(viewPortDistance: number): Camera {
  //   this.logger.logDebug('enter updateViewPortDistance');
  //   let oldViewPortDistance: number;
  //   oldViewPortDistance = this.viewPortDistance;
  //   this.setViewPortDistance(viewPortDistance);
  //   if(this.viewPortDistance === oldViewPortDistance) {
  //     this.logger.logVerbose('viewPortDistance unchanged');
  //     this.logger.logDebug('exit updateViewPortDistance');
  //     return this;
  //   }
  //   if(this.zDirection) {
  //     this.logger.logVerbose(
  //       'using camera forward direction to recalculate camera position'
  //     );
  //     this.calculateCameraPosition();
  //     // calculate view frustum too?
  //   }
  //   this.logger.logDebug('exit updateViewPortDistance');
  //   return this;
  // }
  //
  // /**
  //   attempts to update the visible distance
  // */
  // updateVisibleDistance(visibleDistance: number): Camera {
  //   this.logger.logDebug('enter updateVisibleDistance');
  //   let oldVisibleDistance: number;
  //   oldVisibleDistance = this.visibleDistance;
  //   this.setVisibleDistance(visibleDistance);
  //   if(this.visibleDistance === oldVisibleDistance) {
  //     this.logger.logVerbose('visibleDistance unchanged');
  //     this.logger.logDebug('exit updateVisibleDistance');
  //     return this;
  //   }
  //   this.logger.logDebug('exit updateVisibleDistance');
  //   return this;
  // }
  //
  // // NOTE: blocked until vector matrix stuff is done
  // turnLeft(): Camera {
  //   this.logger.logDebug('enter turnLeft');
  //   // todo
  //   // rotate the camera direction using matrix
  //   //this.zDirection.
  //   this.calculateCameraRightDirection()
  //     .calculateCameraUpDirection()
  //     .calculateCameraPosition()
  //     .calculateViewFrustum();
  //   this.logger.logDebug('exit turnLeft');
  //   return this;
  // }
  //
  // turnRight(): Camera {
  //   this.logger.logDebug('enter turnRight');
  //   // todo
  //   // rotate the camera direction using matrix
  //   //this.zDirection.
  //   this.calculateCameraRightDirection()
  //     .calculateCameraUpDirection()
  //     .calculateCameraPosition()
  //     .calculateViewFrustum();
  //   this.logger.logDebug('exit turnRight');
  //   return this;
  // }
  //
  // // todo look at position (from direction?)

  // get
  getHorizontalFieldOfView(): number {
    this.logger.logDebug('enter getHorizontalFieldOfView');
    this.logger.logVerbose(
      'horizontalFieldOfView: ' + this.horizontalFieldOfView
    );
    this.logger.logDebug('exit getHorizontalFieldOfView');
    return this.horizontalFieldOfView;
  }

  getViewPortAspectRatio(): number {
    this.logger.logDebug('enter getViewPortAspectRatio');
    this.logger.logVerbose(
      'viewPortAspectRatio: ' + this.viewPortAspectRatio
    );
    this.logger.logDebug('exit getViewPortAspectRatio');
    return this.viewPortAspectRatio;
  }

  getViewPortDistance(): number {
    this.logger.logDebug('enter getViewPortDistance');
    this.logger.logVerbose(
      'viewPortDistance: ' + this.viewPortDistance
    );
    this.logger.logDebug('exit getViewPortDistance');
    return this.viewPortDistance;
  }

  getVisibleDistance(): number {
    this.logger.logDebug('enter getVisibleDistance');
    this.logger.logVerbose(
      'visibleDistance: ' + this.visibleDistance
    );
    this.logger.logDebug('exit getVisibleDistance');
    return this.visibleDistance;
  }

  getViewPortCenterPosition(): Vector3 {
    this.logger.logDebug('enter getViewPortCenterPosition');
    this.logger.logVerbose(
      'viewPortCenterPosition: ('
      + this.viewPortCenterPosition.x + ','
      + this.viewPortCenterPosition.y + ','
      + this.viewPortCenterPosition.z + ')'
    );
    this.logger.logDebug('exit getViewPortCenterPosition');
    return this.viewPortCenterPosition;
  }

  getCameraPosition(): Vector3 {
    this.logger.logDebug('enter getCameraPosition');
    this.logger.logVerbose(
      'cameraPosition: ('
      + this.cameraPosition.x + ','
      + this.cameraPosition.y + ','
      + this.cameraPosition.z + ')'
    );
    this.logger.logDebug('exit getCameraPosition');
    return this.cameraPosition;
  }

  getCameraForwardDirection(): Vector3 {
    this.logger.logDebug('enter getCameraForwardDirection');
    this.logger.logVerbose(
      'cameraForwardDirection: ('
      + this.zDirection.x + ', '
      + this.zDirection.y + ', '
      + this.zDirection.z + ')'
    );
    this.logger.logDebug('exit getCameraForwardDirection');
    return this.zDirection;
  }

  getCameraRightDirection(): Vector3 {
    this.logger.logDebug('enter getCameraRightDirection');
    this.logger.logVerbose(
      'cameraRightDirection: ('
      + this.xDirection.x + ', '
      + this.xDirection.y + ', '
      + this.xDirection.z + ')'
    );
    this.logger.logDebug('exit getCameraRightDirection');
    return this.xDirection;
  }

  getCameraUpDirection(): Vector3 {
    this.logger.logDebug('enter getCameraUpDirection');
    this.logger.logVerbose(
      'cameraUpDirection: ('
      + this.yDirection.x + ', '
      + this.yDirection.y + ', '
      + this.yDirection.z + ')'
    );
    this.logger.logDebug('exit getCameraUpDirection');
    return this.yDirection;
  }

  getViewFrustum(): Frustum {
    this.logger.logDebug('enter getViewFrustum');
    this.calculateViewFrustum();
    this.logger.logDebug('exit getViewFrustum');
    return this.viewFrustum;
  }
  /**
    attempts to calculate the cameraPosition using the
    viewPortCenterPosition, the viewPortDistance, and
    the zDirection.
  */
  private calculateCameraPosition(): Camera {
    this.logger.logDebug('enter calculateCameraPosition');
    // requires view port center position, view port distance, and camera forward direction to be set...
    if(!this.viewPortCenterPosition) {
      this.logger.logError('viewPortCenterPosition undefined');
      this.logger.logDebug('exit calculateCameraPosition');
      return this;
    }
    if(!this.zDirection) {
      this.logger.logError('zDirection undefined');
      this.logger.logDebug('exit calculateCameraPosition');
      return this;
    }
    let cameraMovement: Vector3;
    cameraMovement = this.zDirection.clone()
      .scale(this.viewPortDistance);
    this.cameraPosition = this.viewPortCenterPosition.clone()
      .subtractVector(cameraMovement);
    this.logger.logDebug('exit calculateCameraPosition');
    return this;
  }
  /**
    calculates the directions of the camera coordinate system in relation to the world system
  */
  private calculateCameraDirections(): Camera {
    this.logger.logDebug('enter calculateCameraDirections');
    this.calculateCameraForwardDirection();
    this.calculateCameraRightDirection();
    this.calculateCameraUpDirection();
    this.logger.logDebug('exit calculateCameraDirections');
    return this;
  }

  /**
    calculates the forward direction(z axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraForwardDirection(): Camera {
    this.logger.logDebug('enter calculateCameraForwardDirection');
    this.zDirection = this.viewPortCenterPosition.clone()
      .subtractVector(this.cameraPosition)
      .normalize();
    this.logger.logVerbose(
      'cameraForwardDirection: ('
      + this.zDirection.x + ', '
      + this.zDirection.y + ', '
      + this.zDirection.z + ')'
    );
    this.logger.logDebug('exit calculateCameraForwardDirection');
    return this;
  }

  /**
    calculates the right direction(x axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraRightDirection(): Camera {
    this.logger.logDebug('enter calculateCameraRightDirection');
    this.xDirection = this.zDirection.cross(
      this.map.getUpDirection()
    )
      .normalize();
    this.logger.logVerbose(
      'cameraRightDirection: ('
      + this.xDirection.x + ', '
      + this.xDirection.y + ', '
      + this.xDirection.z + ')'
    );
    this.logger.logDebug('exit calculateCameraRightDirection');
    return this;
  }

  /**
    calculates the upward direction(y axis) of the camera coordinate system in relation to the world system
  */
  private calculateCameraUpDirection(): Camera {
    this.logger.logDebug('enter calculateCameraUpDirection');
    this.yDirection = this.xDirection.cross(this.zDirection);
    this.logger.logVerbose(
      'cameraUpDirection: ('
      + this.yDirection.x + ', '
      + this.yDirection.y + ', '
      + this.yDirection.z + ')'
    );
    this.logger.logDebug('exit calculateCameraUpDirection');
    return this;
  }

  private calculateViewFrustum(): Camera {
    this.logger.logDebug('enter calculateViewFrustum');
    this.calculateCameraDirections();
    this.viewFrustum = new Frustum().calculate(
      this.horizontalFieldOfView,
      this.viewPortAspectRatio,
      this.viewPortDistance,
      this.visibleDistance,
      this.cameraPosition,
      this.viewPortCenterPosition,
      this.zDirection,
      this.xDirection,
      this.yDirection
    );
    this.logger.logDebug('exit calculateViewFrustum');
    return this;
  }
}
