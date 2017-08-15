import { CoordinateSystem } from '../math/coordinate-system';
import { Vector3 } from '../math/vector3';
import { Matrix3 } from '../math/matrix3';
import { Matrix4 } from '../math/matrix4';

export class Transform {
  // id? reference to what it is attached to?
  private parent: Transform;
  private children: Transform[];
  private transformationMatrix: Matrix4;

  public static lerpBetween( start: Transform, end: Transform, alpha: number ) {
    // const lerped = end.clone();
    // const lerpedMatrix = lerped.getTransformationMatrix();
    // lerpedMatrix
    // .subtractMatrix( start )
    // .multiplyScalar( alpha )
    // .addMatrix( start );
    // return lerped;
  }

  public constructor() {
    this.transformationMatrix = new Matrix4();
  }

  // initialization
  public setRotationFromMatrix( rotation: Matrix3 ): Transform {
    const mElements: number[][] = rotation.getElements();

    for (
      let ir = 0;
      ir < 3;
      ir++
    ) {
      for (
        let ic = 0;
        ic < 3;
        ic++
      ) {
        this.transformationMatrix.setElement(
          ir, ic,
          mElements[ ir ][ ic ]
        );
      }
    }

    return this;
  }

  // or was it translation?
  public setPositionFromVector( position: Vector3): Transform {
    const pComponents: number[] = position.getComponents();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      this.transformationMatrix.setElement(
        i, 3,
        pComponents[ i ]
      );
    }

    return this;
  }

  // should only be used for init, use modification method for changing
  public setParent( parent: Transform ) {
    if ( this.parent ) {
      this.parent.removeChild( this );
    }
    this.parent = parent;
    this.parent.addChild( this );
  }

  // set scale?

  // modification
  public changeParent( parent: Transform ) {
    // apply transform to new parent from current parent
    this.parent = parent;
  }

  public addChild( child: Transform ) {
    // todo
    this.children.push( child );
  }

  public removeChild( child: Transform ) {
    // todo
  }

  // apply transformation

  // products
  public getParent(): Transform {
    return this.parent;
  }

  public getRotationMatrix(): Matrix3 {
    const rotation: Matrix3 = new Matrix3();
    const elements: number[][] = this.transformationMatrix.getElements();

    for (
      let ir = 0;
      ir < 3;
      ir++
    ) {
      for (
        let ic = 0;
        ic < 3;
        ic++
      ) {
        rotation.setElement(
          ir, ic,
          elements[ ir ][ ic ]
        );
      }
    }

    return rotation;
  }

  public getPositionVector(): Vector3 {
    const position: Vector3 = new Vector3();
    const elements: number[][] = this.transformationMatrix.getElements();

    for (
      let i = 0;
      i < 3;
      i++
    ) {
      position.setComponent(
        i,
        elements[ i ][ 3 ]
      );
    }

    return position;
  }

  getPositionRelativeToCoordinateSystem( coordinateSystem: CoordinateSystem ) {
    // if ( this.coordinateSystem.hasConnectionTo( coordinateSystem ) ) {
    //   const clone: Transform = this.clone();
    //   clone.transferToCoordinateSystem( coordinateSystem );
    //   return clone;
    // }
  }

  clone(): Transform {
    const clone: Transform = new Transform();
    // todo set matrix/vector too
    return clone;
  }
}
