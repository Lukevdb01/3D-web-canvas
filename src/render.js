import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();

const HDRTextureURL = new URL('/environment/golden_gate_hills_1k.hdr', import.meta.url);
const gltfLoader = new GLTFLoader();

class render {
    renderer;
    camera;
    /**
     *
     */
    constructor(_camera) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = _camera;
    }

    pipeline() {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 2.3;
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        const loader = new RGBELoader();
        loader.load(HDRTextureURL, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
        });

        gltfLoader.load('models/Sponza/Sponza.gltf', function (gltf) {
            const model = gltf.scene;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.frustumCulled = true;
                }
            });

            scene.add(model);
        });
    }

    target(element) {
        element.value.appendChild(this.renderer.domElement);
    }

    get_render() {
        return this.renderer;
    }

    get_scene() {
        return scene;
    }
}
export default render;