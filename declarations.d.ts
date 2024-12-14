declare module "tailwind-scrollbar-hide";
declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader } from "three";
  export class GLTFLoader extends Loader {
    load(url: string, onLoad: (gltf: GLTF) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
  }
  export interface GLTF {
    scene: THREE.Group;
    scenes: THREE.Group[];
    animations: THREE.AnimationClip[];
    asset: object;
  }
}
