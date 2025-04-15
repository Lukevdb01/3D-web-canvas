<template>
  <main ref="canvas"></main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import MinMaxGUIHelper from './guiHelper.js'
import { OrbitControls } from "three/examples/jsm/Addons.js";

const fov = 45;
const aspect = 2; 
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 40, 20);

const cameraHelper = new THREE.CameraHelper(camera);
const scene = new THREE.Scene();
const canvas = ref(null);
const renderer = new THREE.WebGLRenderer();

const gltfLoader = new GLTFLoader();
const gui = new GUI();

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const updateCamera = () => {
  camera.updateProjectionMatrix();
}

const updateRendererSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

window.addEventListener('resize', updateRendererSize);

onMounted(() => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  animate();
  camera.position.z = 5;

  const color = 0xFFFFFF;
  const intensity = 0.1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5); // x, y, z
  scene.add(directionalLight);
  scene.add(cameraHelper);

  gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
  gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 5, 0);
  controls.update();

  gltfLoader.load('models/Sponza/Sponza.gltf', function (gtlf) {
    scene.add(gtlf.scene);
  });

  canvas.value.appendChild(renderer.domElement);
});
</script>