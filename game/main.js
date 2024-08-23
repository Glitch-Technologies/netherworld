var viewFullScreen = document.getElementById("play-button");
let ctx, canvas, canvasContainer; //Hooray for global variables
let typingOn, typingPositionX, typingPositionY;

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
        init();
    })
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function init() {
    //This is control for variable setup and asset loading
    assetsLoaded = 0;

    canvasContainer = document.getElementById('canvas-container');
    canvas = document.createElement('canvas');

    canvas.addEventListener("mousedown", function(event) {
        const pos = getMousePos(canvas, event);
        const nearestX = Math.floor(pos.x / 8) * 8;
        const nearestY = Math.floor(pos.y / 8) * 8;
        console.log(`Nearest point: (${nearestX}, ${nearestY})`);
        drawText("Q", nearestX, nearestY);
    });

    canvasContainer.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.canvas.width = 640;
    ctx.canvas.height = 480;
    
    const font = new Image();
    font.src = "../assets/ib8xcp437.png";
    font.onload = function() {
        assetsLoaded++;
        if (assetsLoaded === 1) {
            main();
        }
    }
}


function main() {
    resizeCanvas();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "white";
    ctx.strokeRect(4, 4, canvas.width-4, canvas.height-4);
    //sampleDisplay();
    drawText("Hello, World!", 8, 8);
    typingOn = true;
    typingPositionX = 8;
    typingPositionY = 8;
}
// Add event listener for window resize
window.addEventListener('resize', function() {
    // Update canvas size
    resizeCanvas();
});

document.addEventListener("keydown", function(event) {
    // Handle key input here
    const key = event.key;
    if (key.length === 1) {
        // Handle single character input here
        if (typingOn) {
            drawText(key, typingPositionX, typingPositionY);
            typingPositionX += 8;
            if (typingPositionX >= 632) {
                typingPositionX = 8;
                typingPositionY += 8;
            }
        }
    }
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
    //let marginTop = (h / 2) - ((h * scalefactor / 100) / 2);
    canvas.style.margin = `0px ${marginRight}px`;
}  

function fullscreenchanged() {
    console.log(`Fullscreen changed`);
    console.log(`${Document.fullscreenElement}`);
    resizeCanvas();
    orientationLock();
}

function sampleDisplay() {  //copilot lowkey highkey cooked ong fr
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

function drawText(text, x, y) {
    const fontWidth = 8;
    const fontHeight = 8;
    const fontMap = 
` ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`; 
    //129 more character to add, but this is good enough for demo
    const fontImage = new Image();
    fontImage.src = "../assets/ib8xcp437.png";
    fontImage.onload = function() {
        for (let i = 0; i < text.length; i++) {
            const charIndex = fontMap.indexOf(text[i]);
            const sx = charIndex * fontWidth;
            const sy = 0;
            ctx.drawImage(fontImage, sx, sy, fontWidth, fontHeight, x + (i * fontWidth), y, fontWidth, fontHeight);
        }
    }
}

function orientationLock() {
    screen.orientation.lock("landscape-primary")
    .catch((error) => {
        console.log(`Error: ${error.message}`);
    });
}

function mainMenu() {
    //This is the main menu
    drawText("Main Menu", 8, 8);
    drawText("> Start", 8, 16);
    drawText("> Load", 8, 24);
    drawText("> Options", 8, 24);
    drawText("> Exit", 8, 32);
}