import * as THREE from "./three.core.js";
import { OrbitControls } from "./orbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;

// Flag to track user interaction
let isInteracting = false;

// Listen for control events
controls.addEventListener("start", () => {
  isInteracting = true;
});
controls.addEventListener("end", () => {
  isInteracting = false;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (!isInteracting) {
    cube.rotation.x += 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
