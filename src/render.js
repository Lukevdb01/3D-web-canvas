import * as THREE from "three";

class render {
    renderer;
    scene;
    camera;
    /**
     *
     */
    constructor(_scene, _camera) {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = _scene;
        this.camera = _camera;
    }

    pipeline() {
        const color = 0xFFFFFF;
        const intensity = 0.1;
        const light = new THREE.AmbientLight(color, intensity);
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5); // x, y, z
        this.scene.add(directionalLight);
    }

    target(element) {
        element.value.appendChild(this.renderer.domElement);
    }

    get() {
        return this.renderer;
    }
}
export default render;