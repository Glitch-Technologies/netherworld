const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.canvas.width = 320;
ctx.canvas.height = 240;


function main() {
    resizeCanvas();
}
// Add event listener for window resize
window.addEventListener('resize', function() {
    // Update canvas size
    resizeCanvas();
});

function resizeCanvas() {
    const sheet = document.styleSheets[0];
    const canvas = sheet.cssRules[0];
    let w = window.innerWidth;
    let h = window.innerHeight;
    let scalefactor = 1;
    let idealWidth = 320;
    let idealHeight = 240;
    if (w > h) {
        scalefactor = (h*idealWidth) / (w*idealHeight);
    } else {
        scalefactor = (w*idealWidth) / (h*idealHeight);
    }
    scalefactor = scalefactor * 100;
    canvas.style.width = scalefactor.toString() + "%";
    canvas.style.height = scalefactor.toString() + "%";
}

//Begin execution
main();