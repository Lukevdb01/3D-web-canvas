<template>
  <header>
    <button @click="spawn_cube()">+</button>
  </header>
  <main ref="canvas"></main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { FileLoader } from "three";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
const canvas = ref(null);
const renderer = new THREE.WebGLRenderer();
const cubes = [];
const loader = new FileLoader();

let fragmentShader = ""; 
loader.load('shaders/fragment.glsl',
  ((data) => {
    fragmentShader = data;
  })
);
let vertexShader = "";
loader.load('shaders/vertex.glsl',
  ((data) => {
    vertexShader = data;
  })
);

const spawn_cube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(geometry, material);

  const spread = 10; // hoe ver kubussen van elkaar kunnen liggen
  cube.position.set(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread
  );

  cubes.push(cube);
  scene.add(cube);
}

const animate = () => {
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

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

  canvas.value.appendChild(renderer.domElement);
});
</script>