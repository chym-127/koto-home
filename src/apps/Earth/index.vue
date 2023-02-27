<script setup lang="ts">
import { onMounted } from 'vue';
import type { PropType } from 'vue';
import { AppInstance, AppInstanceState } from '../index';
import pacmanIco from '@assets/app-icons/pac-man.ico';
import useInstance from '../useInstance';
import AppWrap from '../../components/AppWrap/index.vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import earthMap from '../../assets/earth.jpg';
import { getLatLngObj, getGroundTracks } from 'tle.js';
import { coordinateToPosition } from './index';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: any = null;

function init(el: any, width: any, height: any) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const geometry = new THREE.SphereGeometry(5, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(earthMap),
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.position.z = 20;
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 0;
  controls.maxDistance = 200;
}

function addSatlite() {
  const tle = `ISS (ZARYA)
1 25544U 98067A   17206.18396726  .00001961  00000-0  36771-4 0  9993
2 25544  51.6400 208.9163 0006317  69.9862  25.2906 15.54225995 67660`;
  // console.log(getLatLngObj(tle));
  const { lat, lng } = getLatLngObj(tle);
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  const { x, y, z } = coordinateToPosition(lat, lng, 10);
  const geometry = new THREE.SphereGeometry(0.05, 32, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = +x;
  cube.position.y = +y;
  cube.position.z = +z;

  getGroundTracks({
    tle: tle,
    stepMS: 1000,
    isLngLatFormat: false,
  }).then((resp) => {
    console.log(resp);
    const points = [];
    for (let index = 0; index < resp[1].length; index++) {
      const coordinates = resp[1][index];
      const { x, y, z } = coordinateToPosition(coordinates[0], coordinates[1], 10);
      points.push(new THREE.Vector3(+x, +y, +z));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  });
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

const props = defineProps({
  instance: Object as PropType<AppInstance>,
});
onMounted(() => {
  const canvas: any = document.getElementById('earth-canvas');
  canvas.width = 900;
  canvas.height = 600;

  init(canvas, 900, 600);
  addSatlite();
  animate();
});

function closeApp() {
  changeAppInstanceState(AppInstanceState.CLOSE);
  setTimeout(() => {
    removeAppInstance();
  }, 700);
}

const { changeAppInstanceState, removeAppInstance } = useInstance(props.instance!.uuid);
</script>
<template>
  <AppWrap
    ref="appWrapRef"
    :state="props.instance!.state"
    :icon="pacmanIco"
    :width="800"
    :height="600"
    @closeApp="closeApp"
  >
    <canvas id="earth-canvas" width="900" height="600"></canvas>
  </AppWrap>
</template>
