const container = document.getElementById('viewer-container');
const viewer = new WebIFCViewer.Viewer({
    container,
    backgroundColor: new THREE.Color(0xffffff),
});

viewer.IFC.setWasmPath('https://unpkg.com/web-ifc@0.0.44/');

const loadModel = async (url) => {
    await viewer.IFC.loadIfcUrl(url);
    viewer.context.fitToFrame();
};

// Load your IFC model
loadModel('https://3eg.co/ul/ifc-viewer/aisc_sculpture_param.ifc');

// Add controls
viewer.context.ifcCamera.cameraControls.enableRotate = true;
viewer.context.ifcCamera.cameraControls.enablePan = true;
viewer.context.ifcCamera.cameraControls.enableZoom = true;

// Measurement tool
let measurementsActive = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') {
        measurementsActive = !measurementsActive;
        viewer.dimensions.active = measurementsActive;
        viewer.dimensions.previewActive = measurementsActive;
    }
});

// Clipping planes
let sectionActive = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'c' || event.key === 'C') {
        sectionActive = !sectionActive;
        viewer.clipper.active = sectionActive;
    }
});

viewer.clipper.createPlane();
