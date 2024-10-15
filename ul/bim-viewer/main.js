// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load glTF model
const loader = new THREE.GLTFLoader();
loader.load(
  'assets/models/your-model.glb', // Update path if necessary
  function (gltf) {
    scene.add(gltf.scene);
    // Optional: Adjust camera position based on model size
    camera.position.set(5, 5, 5);
    controls.update();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

/* --- Toolbar Button Functionality --- */

// Zoom In
document.getElementById('zoomInBtn').addEventListener('click', () => {
  // Option 1: Adjust the camera's field of view
  camera.fov = Math.max(camera.fov - 5, 10); // Prevent fov from being too small
  camera.updateProjectionMatrix();
  controls.update();
  
  // Option 2: Move the camera closer
  // const zoomFactor = 1.2;
  // camera.position.multiplyScalar(1 / zoomFactor);
  // controls.update();
});

// Zoom Out
document.getElementById('zoomOutBtn').addEventListener('click', () => {
  // Option 1: Adjust the camera's field of view
  camera.fov = Math.min(camera.fov + 5, 100); // Prevent fov from being too large
  camera.updateProjectionMatrix();
  controls.update();
  
  // Option 2: Move the camera farther
  // const zoomFactor = 1.2;
  // camera.position.multiplyScalar(zoomFactor);
  // controls.update();
});

// Rotate Left
document.getElementById('rotateLeftBtn').addEventListener('click', () => {
  // Rotate the model or camera
  scene.rotation.y += THREE.MathUtils.degToRad(10); // Rotate scene
  // Alternatively, rotate the camera around the target
  // controls.rotateLeft(Math.PI / 18); // 10 degrees
  controls.update();
});

// Rotate Right
document.getElementById('rotateRightBtn').addEventListener('click', () => {
  // Rotate the model or camera
  scene.rotation.y -= THREE.MathUtils.degToRad(10); // Rotate scene
  // Alternatively, rotate the camera around the target
  // controls.rotateRight(Math.PI / 18); // 10 degrees
  controls.update();
});
