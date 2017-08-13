import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

export class CoordinateSystem {
  private coordinateSystemId: string;
  private origin: Vector3;
  private basis: Matrix3;
  // directions / basis?
  // connected coordinates / systems for which transform matrices exist
  // children

  constructor() {}

  setCoordinateSystemId( coordinateSystemId: string ) {
    this.coordinateSystemId = coordinateSystemId;
  }


  getCoordinateSystemId(): string {
    return this.coordinateSystemId;
  }

  // relative position

  // transform matrix
}
