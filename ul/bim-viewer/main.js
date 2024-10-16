// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load glTF model
const loader = new GLTFLoader();
loader.load(
  'assets/models/9_6_2024.glb', // Ensure this path is correct
  function (gltf) {
    scene.add(gltf.scene);
    
    // Adjust camera to fit the model
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    controls.reset();

    gltf.scene.position.x += (gltf.scene.position.x - center.x);
    gltf.scene.position.y += (gltf.scene.position.y - center.y);
    gltf.scene.position.z += (gltf.scene.position.z - center.z);
    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 5.0;
    camera.position.z += size / 2.0;
    controls.maxDistance = size * 10;
    controls.target.copy(center);
    controls.update();
  },
  undefined,
  function (error) {
    console.error('An error happened while loading the model:', error);
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
  camera.fov = Math.max(camera.fov - 5, 10); // Prevent fov from being too small
  camera.updateProjectionMatrix();
  controls.update();
});

// Zoom Out
document.getElementById('zoomOutBtn').addEventListener('click', () => {
  camera.fov = Math.min(camera.fov + 5, 100); // Prevent fov from being too large
  camera.updateProjectionMatrix();
  controls.update();
});

// Rotate Left
document.getElementById('rotateLeftBtn').addEventListener('click', () => {
  scene.rotation.y += THREE.MathUtils.degToRad(10); // Rotate scene
  controls.update();
});

// Rotate Right
document.getElementById('rotateRightBtn').addEventListener('click', () => {
  scene.rotation.y -= THREE.MathUtils.degToRad(10); // Rotate scene
  controls.update();
});
