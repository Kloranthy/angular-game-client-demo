import { LoggingService } from '../../core/service/logging.service';
import { Logger } from '../../core/model/logger';

import { Camera } from './camera';
import { Plane } from './plane';
import { Vector3 } from './vector3';

export class Frustum {
  private logger: Logger = LoggingService.getLogger('Frustum');
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

  // NOTE: still broken despite what the linter says! many variables are not defined as I do not have getters made/called!
  private calculatePoints(camera: Camera): Frustum {
    this.logger.logDebug('enter calculatePoints');
    // camera
    let cameraPosition: Vector3;
    let viewPortCenterPosition: Vector3;
    let horizontalFieldOfView: number;
    let viewPortDistance: number;
    let visibleDistance: number;
    let viewPortAspectRatio: number;
    let cameraForwardDirection: Vector3;
    let cameraRightDirection: Vector3;
    let cameraUpDirection: Vector3;
    //
    let nearViewPortWidth: number;
    let nearViewPortHeight: number;
    let farViewCenter: Vector3;
    let farViewPortWidth: number;
    let farViewPortHeight: number;
    //
    cameraPosition = camera.getCameraPosition();
    horizontalFieldOfView = camera.getHorizontalFieldOfView();
    viewPortAspectRatio = camera.getViewPortAspectRatio();
    // NOTE: these are half width and height???
    nearViewPortWidth = Math.tan(horizontalFieldOfView / 2)
      * viewPortDistance;
    nearViewPortHeight = nearViewPortWidth / viewPortAspectRatio;

    farViewPortWidth = Math.tan(horizontalFieldOfView / 2)
      * (viewPortDistance + visibleDistance);
    farViewPortHeight = farViewPortWidth / viewPortAspectRatio;

    this.nearTopLeftPoint = viewPortCenterPosition.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale(nearViewPortWidth)
      )
      .addVector(
        cameraUpDirection.clone()
          .scale(nearViewPortHeight)
      );
    this.logger.logVerbose(
      'nearTopLeftPoint ('
      + this.nearTopLeftPoint.x + ', '
      + this.nearTopLeftPoint.y + ', '
      + this.nearTopLeftPoint.z + ')'
    );

    this.nearTopRightPoint = viewPortCenterPosition.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale(nearViewPortWidth)
      )
      .addVector(
        cameraUpDirection.clone()
          .scale(nearViewPortHeight)
      );
    this.logger.logVerbose(
      'nearTopRightPoint ('
      + this.nearTopRightPoint.x + ', '
      + this.nearTopRightPoint.y + ', '
      + this.nearTopRightPoint.z + ')'
    );

    this.nearBottomLeftPoint = viewPortCenterPosition.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale(nearViewPortWidth)
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale(nearViewPortHeight)
      );
    this.logger.logVerbose(
      'nearBottomLeftPoint ('
      + this.nearBottomLeftPoint.x + ', '
      + this.nearBottomLeftPoint.y + ', '
      + this.nearBottomLeftPoint.z + ')'
    );

    this.nearBottomRightPoint = viewPortCenterPosition.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale(nearViewPortWidth)
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale(nearViewPortHeight)
      );
    this.logger.logVerbose(
      'nearBottomRightPoint ('
      + this.nearBottomRightPoint.x + ', '
      + this.nearBottomRightPoint.y + ', '
      + this.nearBottomRightPoint.z + ')'
    );

    // now extend the visible distance out from the view port center
    farViewCenter = viewPortCenterPosition.clone()
      .addVector(cameraForwardDirection.clone()
        .scale(visibleDistance)
      );
    this.logger.logVerbose(
      'farViewCenter ('
      + farViewCenter.x + ', '
      + farViewCenter.y + ', '
      + farViewCenter.z + ')'
    );

    // now use these to find the far points
    this.farTopLeftPoint = farViewCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale(farViewPortWidth)
      )
      .addVector(
        cameraUpDirection.clone()
          .scale(farViewPortHeight)
      );
    this.logger.logVerbose(
      'farTopLeftPoint ('
      + this.farTopLeftPoint.x + ', '
      + this.farTopLeftPoint.y + ', '
      + this.farTopLeftPoint.z + ')'
    );

    this.farTopRightPoint = farViewCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale(farViewPortWidth)
      )
      .addVector(
        cameraUpDirection.clone()
          .scale(farViewPortHeight)
      );
    this.logger.logVerbose(
      'farTopRightPoint ('
      + this.farTopRightPoint.x + ', '
      + this.farTopRightPoint.y + ', '
      + this.farTopRightPoint.z + ')'
    );

    this.farBottomLeftPoint = farViewCenter.clone()
      .subtractVector(
        cameraRightDirection.clone()
          .scale(farViewPortWidth)
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale(farViewPortHeight)
      );
    this.logger.logVerbose(
      'farBottomLeftPoint ('
      + this.farBottomLeftPoint.x + ', '
      + this.farBottomLeftPoint.y + ', '
      + this.farBottomLeftPoint.z + ')'
    );

    this.farBottomRightPoint = farViewCenter.clone()
      .addVector(
        cameraRightDirection.clone()
          .scale(farViewPortWidth)
      )
      .subtractVector(
        cameraUpDirection.clone()
          .scale(farViewPortHeight)
      );
    this.logger.logVerbose(
      'farBottomRightPoint ('
      + this.farBottomRightPoint.x + ', '
      + this.farBottomRightPoint.y + ', '
      + this.farBottomRightPoint.z + ')'
    );
    this.logger.logDebug('exit calculatePoints');
    return this;
  }

  private calculatePlanes(): Frustum {
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

}
