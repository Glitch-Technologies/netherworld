var viewFullScreen = document.getElementById("play-button");
if (viewFullScreen) {
    viewFullScreen.addEventListener("click", function() {
        var docElm = document.documentElement;
        docElm.addEventListener("fullscreenchange", fullscreenchanged);
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        viewFullScreen.classList.add("hidden");
        main();
    })
}

const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.canvas.width = 320;
ctx.canvas.height = 240;


function main() {
    resizeCanvas();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    sampleDisplay();
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

    //console.log(`${Document.fullscreenElement}`);

    //orientationLock();

    //console.log(`Windows is ${h} x ${w}`);
}  

function fullscreenchanged() {
    console.log(`Fullscreen changed`);
    console.log(`${Document.fullscreenElement}`);
    orientationLock();
}

function sampleDisplay() {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    const tileSize = 16;
    const numTilesX = Math.floor(canvas.width / tileSize);
    const numTilesY = Math.floor(canvas.height / tileSize);

    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = color;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function orientationLock() {
    screen.orientation.lock("landscape-primary")
    .catch((error) => {
        console.log(`Error: ${error.message}`);
    });
}

