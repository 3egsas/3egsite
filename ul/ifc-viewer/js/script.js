// Import necessary classes from the web-ifc-viewer library
import { IfcViewerAPI } from 'https://unpkg.com/browse/web-ifc-viewer@1.0.218/dist/ifc-viewer-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the IFC Viewer
    const container = document.getElementById('viewer-container');
    const viewer = new IfcViewerAPI({ 
        container,
        backgroundColor: new THREE.Color(0xa0a0a0) // Light grey background
    });

    // Add grid and axes helpers
    viewer.grid.setGrid();
    viewer.axes.setAxes();

    // Reference to the file input element
    const input = document.getElementById('file-input');

    // Handle File Upload
    input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.ifc')) {
            const ifcURL = URL.createObjectURL(file);
            await loadIFC(ifcURL);
        } else {
            alert('Please upload a valid IFC file.');
        }
    });

    // Function to load IFC file
    async function loadIFC(url) {
        viewer.IFC.loader.destroy(); // Clear previous IFC model
        viewer.context.renderer.postProduction.active = true;
        viewer.IFC.setWasmPath('https://unpkg.com/web-ifc@0.0.34/');
        await viewer.IFC.loadIfcUrl(url);
        viewer.context.renderer.cameraControls.fitToFrame(); // Adjust camera
    }

    // Measure Tool
    const measureBtn = document.getElementById('measure-btn');
    let measurerActive = false;

    measureBtn.addEventListener('click', () => {
        measurerActive = !measurerActive;
        viewer.tools.ifc.loader.ifcManager.toggleRaycastPrecision(measurerActive);
        if (measurerActive) {
            measureBtn.style.backgroundColor = '#d3d3d3';
            viewer.tools.measure.toggleMeasureTool(true);
        } else {
            measureBtn.style.backgroundColor = '#ffffff';
            viewer.tools.measure.toggleMeasureTool(false);
        }
    });

    // Slice Tool
    const sliceBtn = document.getElementById('slice-btn');
    let slicingActive = false;

    sliceBtn.addEventListener('click', () => {
        slicingActive = !slicingActive;
        if (slicingActive) {
            sliceBtn.style.backgroundColor = '#d3d3d3';
            viewer.context.clipper.createPlane(); // Create a slicing plane
        } else {
            sliceBtn.style.backgroundColor = '#ffffff';
            viewer.context.clipper.removeAllPlanes(); // Remove all planes
        }
    });

    // Reset View Button
    const resetBtn = document.getElementById('reset-btn');

    resetBtn.addEventListener('click', () => {
        viewer.context.renderer.cameraControls.reset(); // Reset camera position
        viewer.context.clipper.removeAllPlanes(); // Remove all slicing planes
    });

    // Optional: Automatically load a default IFC model if desired
    // const defaultIFC = 'path_to_default.ifc';
    // loadIFC(defaultIFC);
});
