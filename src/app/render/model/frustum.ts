import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Camera } from './camera';
import { Plane } from './plane';
import { Vector3 } from './vector3';

export class Frustum {
  logger: Logger = LoggingService.getLogger('Frustum');
  // points
  nearTopLeftPoint: Vector3;
  nearTopRightPoint: Vector3;
  nearBottomLeftPoint: Vector3;
  nearBottomRightPoint: Vector3;
  farTopLeftPoint: Vector3;
  farTopRightPoint: Vector3;
  farBottomLeftPoint: Vector3;
  farBottomRightPoint: Vector3;
  // planes
  leftPlane: Plane;
  rightPlane: Plane;
  topPlane: Plane;
  bottomPlane: Plane;
  nearPlane: Plane;
  farPlane: Plane;

  constructor() {
    this.logger.logDebug('enter constructor');
    this.logger.logDebug('exit constructor');
  }

  setFromValues(
    nearTopLeftPoint: Vector3,
    nearTopRightPoint: Vector3,
    nearBottomLeftPoint: Vector3,
    nearBottomRightPoint: Vector3,
    farTopLeftPoint: Vector3,
    farTopRightPoint: Vector3,
    farBottomLeftPoint: Vector3,
    farBottomRightPoint: Vector3,
    leftPlane: Plane,
    rightPlane: Plane,
    topPlane: Plane,
    bottomPlane: Plane,
    nearPlane: Plane,
    farPlane: Plane
  ): Frustum {
    this.logger.logDebug('enter setFromValues');
    this.nearTopLeftPoint = nearTopLeftPoint;
    this.nearTopRightPoint = nearTopRightPoint;
    this.nearBottomLeftPoint = nearBottomLeftPoint;
    this.nearBottomRightPoint = nearBottomRightPoint;
    this.farTopLeftPoint = farTopLeftPoint;
    this.farTopRightPoint = farTopRightPoint;
    this.farBottomLeftPoint = farBottomLeftPoint;
    this.farBottomRightPoint = farBottomRightPoint;
    this.leftPlane = leftPlane;
    this.rightPlane = rightPlane;
    this.topPlane = topPlane;
    this.bottomPlane = bottomPlane;
    this.nearPlane = nearPlane;
    this.farPlane = farPlane;
    this.logger.logDebug('exit setFromValues');
    return this;
  }

  setFromFrustum(frustum: Frustum): Frustum {
    this.logger.logDebug('enter setFromFrustum');
    this.setFromValues(
      frustum.nearTopLeftPoint,
      frustum.nearTopRightPoint,
      frustum.nearBottomLeftPoint,
      frustum.nearBottomRightPoint,
      frustum.farTopLeftPoint,
      frustum.farTopRightPoint,
      frustum.farBottomLeftPoint,
      frustum.farBottomRightPoint,
      frustum.leftPlane,
      frustum.rightPlane,
      frustum.topPlane,
      frustum.bottomPlane,
      frustum.nearPlane,
      frustum.farPlane
    );
    this.logger.logDebug('exit setFromFrustum');
    return this;
  }

  calculate(
    camera: Camera
  ): Frustum {
    this.logger.logDebug('enter calculate');
    this.calculatePoints(camera);
    this.calculatePlanes();
    this.logger.logDebug('exit calculate');
    return this;
  }

  calculatePoints(camera: Camera): Frustum {
    this.logger.logDebug('enter calculatePoints');
    let cameraPosition: Vector3;
    let viewPortCenterPosition: Vector3;
    let viewPortWidth: number; // the width of the view port at the view port distance
    let viewPortHeight: number; // the height of the view port at the view port distance
    let viewPortDistance: number; // the distance to the near plane
    let visibleDistance: number; // the distance visible beyond the near plane
    let cameraDirection: Vector3;
    let upDirection: Vector3;
    let downDirection: Vector3;
    let leftDirection: Vector3;
    let rightDirection: Vector3;
    let nearLeftMovement: Vector3;
    let nearRightMovement: Vector3;
    let nearTopMovement: Vector3;
    let nearBottomMovement: Vector3;
    let farMovement: Vector3; // the transformation from the near plane to the far plane
    let farViewCenter: Vector3;
    let scaledViewPortWidth: number; // the width of the view port at the max visible distance
    let scaledViewPortHeight: number; // the height of the view port at the max visible distance
    let farLeftMovement: Vector3;
    let farRightMovement: Vector3;
    let farTopMovement: Vector3;
    let farBottomMovement: Vector3;

    cameraPosition = camera.cameraPosition;
    viewPortCenterPosition = camera.viewPortCenterPosition;
    viewPortWidth = camera.viewPortWidth;
    viewPortHeight = camera.viewPortHeight;
    viewPortDistance = camera.getViewPortDistance();
    visibleDistance = camera.visibleDistance;
    // start by calculating the camera direction
    cameraDirection = camera.calculateCameraDirection();
    // use the camera direction to calculate the 4 perpendicular directions
    upDirection = camera.calculateUpDirection(cameraDirection);
    downDirection = camera.calculateDownDirection(cameraDirection);
    leftDirection = camera.calculateLeftDirection(cameraDirection);
    rightDirection = camera.calculateRightDirection(cameraDirection);

    // use these directions and the view port dimensions to find the near points
    nearLeftMovement = leftDirection.clone()
      .scale(viewPortWidth / 2);
    nearRightMovement = rightDirection.clone()
      .scale(viewPortWidth / 2);
    nearTopMovement = upDirection.clone()
      .scale(viewPortHeight / 2);
    nearBottomMovement = downDirection.clone()
      .scale(viewPortHeight / 2);

    this.nearTopLeftPoint = viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearTopMovement);
    this.logger.logVerbose(
      'nearTopLeftPoint ('
      + this.nearTopLeftPoint.x + ', '
      + this.nearTopLeftPoint.y + ', '
      + this.nearTopLeftPoint.z + ')'
    );

    this.nearTopRightPoint = viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearTopMovement);
    this.logger.logVerbose(
      'nearTopRightPoint ('
      + this.nearTopRightPoint.x + ', '
      + this.nearTopRightPoint.y + ', '
      + this.nearTopRightPoint.z + ')'
    );

    this.nearBottomLeftPoint = viewPortCenterPosition.clone()
      .addVector(nearLeftMovement)
      .addVector(nearBottomMovement);
    this.logger.logVerbose(
      'nearBottomLeftPoint ('
      + this.nearBottomLeftPoint.x + ', '
      + this.nearBottomLeftPoint.y + ', '
      + this.nearBottomLeftPoint.z + ')'
    );

    this.nearBottomRightPoint = viewPortCenterPosition.clone()
      .addVector(nearRightMovement)
      .addVector(nearBottomMovement);
    this.logger.logVerbose(
      'nearBottomRightPoint ('
      + this.nearBottomRightPoint.x + ', '
      + this.nearBottomRightPoint.y + ', '
      + this.nearBottomRightPoint.z + ')'
    );

    // now extend the visible distance out from the view port center
    farMovement = cameraDirection.clone()
      .scale(visibleDistance);
    farViewCenter = viewPortCenterPosition.clone()
      .addVector(farMovement);
    this.logger.logVerbose(
      'farViewCenter ('
      + farViewCenter.x + ', '
      + farViewCenter.y + ', '
      + farViewCenter.z + ')'
    );

    // now scale the view port dimensions
    scaledViewPortWidth = viewPortWidth
      / viewPortDistance
      * (viewPortDistance + visibleDistance);
    scaledViewPortHeight = viewPortHeight
      / viewPortDistance
      * (viewPortDistance + visibleDistance);

    // now calculate the far direction movements
    farLeftMovement = leftDirection.clone()
      .scale(scaledViewPortWidth / 2);
    farRightMovement = rightDirection.clone()
      .scale(scaledViewPortWidth / 2);
    farTopMovement = upDirection.clone()
      .scale(scaledViewPortHeight / 2);
    farBottomMovement = downDirection.clone()
      .scale(scaledViewPortHeight / 2);

    // now use these to find the far points
    this.farTopLeftPoint = farViewCenter.clone()
      .addVector(farLeftMovement)
      .addVector(farTopMovement);
    this.logger.logVerbose(
      'farTopLeftPoint ('
      + this.farTopLeftPoint.x + ', '
      + this.farTopLeftPoint.y + ', '
      + this.farTopLeftPoint.z + ')'
    );

    this.farTopRightPoint = farViewCenter.clone()
      .addVector(farRightMovement)
      .addVector(farTopMovement);
    this.logger.logVerbose(
      'farTopRightPoint ('
      + this.farTopRightPoint.x + ', '
      + this.farTopRightPoint.y + ', '
      + this.farTopRightPoint.z + ')'
    );

    this.farBottomLeftPoint = farViewCenter.clone()
      .addVector(farLeftMovement)
      .addVector(farBottomMovement);
    this.logger.logVerbose(
      'farBottomLeftPoint ('
      + this.farBottomLeftPoint.x + ', '
      + this.farBottomLeftPoint.y + ', '
      + this.farBottomLeftPoint.z + ')'
    );

    this.farBottomRightPoint = farViewCenter.clone()
      .addVector(farRightMovement)
      .addVector(farBottomMovement);
    this.logger.logVerbose(
      'farBottomRightPoint ('
      + this.farBottomRightPoint.x + ', '
      + this.farBottomRightPoint.y + ', '
      + this.farBottomRightPoint.z + ')'
    );
    this.logger.logDebug('exit calculatePoints');
    return this;
  }

  calculatePlanes(): Frustum {
    this.logger.logDebug('enter calculatePlanes');
    this.logger.logVerbose('leftPlane');
    this.leftPlane = new Plane()
      .setFrom3Points(
        this.nearTopLeftPoint,
        this.nearBottomLeftPoint,
        this.farBottomLeftPoint
      );
    this.logger.logVerbose('rightPlane');
    this.rightPlane = new Plane()
      .setFrom3Points(
        this.nearBottomRightPoint,
        this.nearTopRightPoint,
        this.farBottomRightPoint
      );
    this.logger.logVerbose('topPlane');
    this.topPlane = new Plane()
      .setFrom3Points(
        this.nearTopRightPoint,
        this.nearTopLeftPoint,
        this.farTopLeftPoint
      );
    this.logger.logVerbose('bottomPlane');
    this.bottomPlane = new Plane()
      .setFrom3Points(
        this.nearBottomLeftPoint,
        this.nearBottomRightPoint,
        this.farBottomLeftPoint
      );
    this.logger.logVerbose('nearPlane');
    this.nearPlane = new Plane()
      .setFrom3Points(
        this.nearTopLeftPoint,
        this.nearTopRightPoint,
        this.nearBottomRightPoint
      );
    this.logger.logVerbose('farPlane');
    this.farPlane = new Plane()
      .setFrom3Points(
        this.farTopRightPoint,
        this.farTopLeftPoint,
        this.farBottomLeftPoint
      );
    this.logger.logDebug('exit calculatePlanes');
    return this;
  }

  clone(): Frustum {
    this.logger.logDebug('enter clone');
    let clone: Frustum;
    clone = new Frustum()
      .setFromFrustum(this);
    this.logger.logDebug('exit clone');
    return clone;
  }

  getPoints(): Vector3[] {
    this.logger.logDebug('enter getPoints');
    let points: Vector3[];
    points = [
      this.nearTopLeftPoint,
      this.nearTopRightPoint,
      this.nearBottomLeftPoint,
      this.nearBottomRightPoint,
      this.farTopLeftPoint,
      this.farTopRightPoint,
      this.farBottomLeftPoint,
      this.farBottomRightPoint
    ];
    this.logger.logDebug('exit getPoints');
    return points;
  }

  getPlanes(): Plane[] {
    this.logger.logDebug('enter getPlanes');
    let planes: Plane[];
    planes = [
      this.leftPlane,
      this.rightPlane,
      this.topPlane,
      this.bottomPlane,
      this.nearPlane,
      this.farPlane
    ];
    this.logger.logDebug('exit getPlanes');
    return planes;
  }

  containsPoint(point: Vector3): boolean {
    this.logger.logDebug('enter containsPoint');
    this.logger.logVerbose('point: ' + point);
    let planes: Plane[];
    planes = this.getPlanes();
    for(let plane of planes) {
      if(plane.distanceBetweenPlaneAndPoint(point) < 0) {
        return false;
      }
    }
    this.logger.logDebug('exit containsPoint');
    return true;
  }
}
