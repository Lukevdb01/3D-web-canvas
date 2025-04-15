<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import render from "./render";

const fov = ref(45);
const aspect = ref(2);
const near = ref(0.1);
const far = ref(100);
const canvas = ref(null);

const camera = new THREE.PerspectiveCamera(fov.value, aspect.value, near.value, far.value);
camera.position.set(0, 40, 20);

const cameraHelper = new THREE.CameraHelper(camera);
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
const renderer = new render(scene, camera);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.get().render(scene, camera);
}

const updateCamera = () => {
  camera.fov = fov.value;
  camera.aspect = aspect.value;
  camera.near = near.value;
  camera.far = far.value;
  camera.updateProjectionMatrix();
};

const updateRendererSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.get().setSize(width, height);
};

onMounted(() => {
  camera.position.z = 5;

  scene.add(cameraHelper);
  renderer.pipeline();

  const controls = new OrbitControls(camera, renderer.get().domElement);
  controls.target.set(0, 5, 0);
  controls.update();

  gltfLoader.load('models/Sponza/Sponza.gltf', function (gtlf) {
    scene.add(gtlf.scene);
  });

  renderer.target(canvas);
  updateRendererSize();
  animate();

  window.addEventListener('resize', updateRendererSize);
});
</script>

<template>
  <header>
    <div class="controls">
      <label>
        FOV
        <input type="range" v-model="fov" @input="updateCamera" min="1" max="180" />
      </label>
      <label>
        Far
        <input type="range" v-model="far" @input="updateCamera" min="0" max="1000" step="1" />
      </label>
      <label>
        Near
        <input type="range" v-model="near" @input="updateCamera" min="0" max="100" step="0.1" />
      </label>
      <label>
        Aspect
        <input type="range" v-model="aspect" @input="updateCamera" min="0.1" max="4" step="0.01" />
      </label>
    </div>
  </header>
  <main ref="canvas"></main>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.controls label {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  gap: 4px;
}

.controls input[type="range"] {
  width: 120px;
}
</style>

