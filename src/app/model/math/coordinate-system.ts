import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

/**
 * not sure if needed, might just replace
 * the coordinate system field of the cell
 * class with a transform and give the transform
 * class a field for parent and child transforms
 */
export class CoordinateSystem {
  private coordinateSystemId: string;
  private origin: Vector3;
  private basis: Matrix3;
  // connected coordinates / systems for which transform matrices exist
  // children / transforms relative to this coordinate system

  constructor() {}

  // initialization
  setCoordinateSystemId( coordinateSystemId: string ) {
    this.coordinateSystemId = coordinateSystemId;
  }

  // modification

  // products
  getCoordinateSystemId(): string {
    return this.coordinateSystemId;
  }

  // relative position

  // transform matrix
}
