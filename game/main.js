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
    let idealWidth = 640;
    let idealHeight = 480;
    if (w > h) {
        scalefactor = (h*idealWidth) / (w*idealHeight);
    } else {
        scalefactor = (w*idealWidth) / (h*idealHeight);
    }
    scalefactor = scalefactor * 99; //Fudge factor to remove scrollbars, trust me on this one.
    canvas.style.width = scalefactor.toString() + "%";
    canvas.style.height = scalefactor.toString() + "%";
    // Center the canvas to the window
    let marginRight = (w / 2) - ((w * scalefactor / 100) / 2);
    canvas.style.margin = `0px ${marginRight}px`;
    screen.orientation.lock("landscape-primary")
    .catch((error) => {
        alert(`Error: ${error.message}`);
    });
    console.log(`Windows is ${h} x ${w}`);
}

//Begin execution
main();