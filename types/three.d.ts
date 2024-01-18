import  type { Object3D } from '/three/index'

declare module 'three' {

    export interface Object3D {
        _isSelected?: boolean,
        material?:any,
        _originColor: number
    }
}
