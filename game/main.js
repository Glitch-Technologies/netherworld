var viewFullScreen = document.getElementById("play-button");
let ctx, canvas, canvasContainer; //Hooray for global variables
let typingOn, typingPositionX, typingPositionY, overflowNotPermitted;
let font, flag, menuPos;
let fonts = [];
let command = "";

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
    });

    canvasContainer.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.canvas.width = 656;
    ctx.canvas.height = 496;
    //640 x 480 + 8px border on all sides
    
    flag = 0;
    menuPos = -1;

    font = new Image();
    font.src = "../assets/ib8xcp437.png";
    font.onload = function() {
        assetsLoaded++;
        fontLoader();
    }
}

function main() {
    resizeCanvas();
    clearScreen();
    flag = 1;
    mainMenu();
}
// Add event listener for window resize
window.addEventListener('resize', function() {
    // Update canvas size
    resizeCanvas();
});

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, 8);
    ctx.fillRect(0, 0, 8, canvas.height);
    ctx.fillRect(0, canvas.height-8, canvas.width, 8);
    ctx.fillRect(canvas.width-8, 0, 8, canvas.height);
}

document.addEventListener("keydown", function(event) {
    // Handle key input here
    const key = event.key;
    if (flag === 1) {
        if  ((key === "w" || key === "s") && (menuPos != -1 && menuPos != 4)) {
            drawText(">", 8, 8+(16*(menuPos+1)), 0);
        }
        if ( key === "w" && menuPos != 0) {
            menuPos--;
            drawText(">", 8, 8+(16*(menuPos+1)), 15);
        } else if (key === "s" && menuPos != 3) {
            menuPos++;
            drawText(">", 8, 8+(16*(menuPos+1)), 15);
        } else if (key === "Enter") {
            if (menuPos === 0) {
                // Start
                drawText("An Error Occured", 280, 8, 12);
                clearScreen();
                introSeq();
            } else if (menuPos === 1) {
                // Load
            } else if (menuPos === 2) {
                // Options
                drawText("An Error Occured", 280, 8, 12);
            } else if (menuPos === 3) {
                // Exit
                drawText("An Error Occured", 280, 8, 12);
            }
        }
    } else if (flag === 2) {
        if (typingOn && overflowNotPermitted) {
            if (key.length === 1 && typingPositionX < 648) {
                drawText(key, typingPositionX, typingPositionY);
                typingPositionX += 8;
                command += key;
            } else if (key === "Backspace" && typingPositionX > 8) {
                typingPositionX -= 8;
                drawText(" ", typingPositionX, typingPositionY);
                command = command.slice(0, -1);
            } else if (key === "Enter") {
                drawText("                                                                                ", 8, typingPositionY);
                typingPositionX = 8;
                //evalCommand(command);
            }
        } else if (typingOn && !overflowNotPermitted) {
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
        }
    }
});

//A game is only a moment in time, but a true adventure lingers in the heart—what separates the two is not the path you walk, but how deeply you choose to travel.

function introSeq() {
    drawText("========================================", 160, 232);
    drawText("| A game is a moment, but an adventure |", 160, 240);
    drawText("| lingers. What matters is not the way |", 160, 248);
    drawText("| you walk, but the friends you made   |", 160, 256);
    drawText("| along the way.      - Greenturtle537 |", 160, 264);
    drawText("========================================", 160, 272);
    drawText("Press any key to continue...", 296, 16, 30);
``
    document.addEventListener("keydown", function(event) {
        // Handle key input here
        const key = event.key;
        if (key === "Enter") {
            setTimeout(function() {
                clearScreen();
                drawText("Darkness. . .", 8, 8);
                drawText("--------------------------------------------------------------------------------", 8, 472);
                typingOn = true;
                typingPositionX = 8;
                typingPositionY = 480;
                overflowNotPermitted = true;
                flag++;
            }, 10); // Add a delay here for dramatic effect
        }
    });
}

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
    scalefactor = scalefactor * 98; //Fudge factor to remove scrollbars, trust me on this one.
    canvas.style.width = scalefactor.toString() + "%";
    canvas.style.height = scalefactor.toString() + "%";
    // Center the canvas to the window
    let marginRight = (w / 2) - ((w * scalefactor / 100) / 2);
    //let marginTop = (h / 2) - ((h * scalefactor / 100) / 2);
    canvas.style.margin = `0px ${marginRight}px`;
}  

function fullscreenchanged() {
    console.log(`Entered Fullscreen`);
    resizeCanvas();
    orientationLock();
}


function drawText(text, x, y, color=0) {
    const fontWidth = 8;
    const fontHeight = 8;
    const fontMap = 
` ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`; 
    //fontMap is for reference only. These characters will not translate through file systems properly.
    const fontCodeMap = [
        32,9786,9787,9829,9830,9827,9824,8226,9688,9675,9689,9794,9792,9834,9835,9788,
        9658,9668,8597,8252,182,167,9644,8616,8593,8595,8594,8592,8735,8596,9650,9660,
        32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,
        58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,
        84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,
        108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126
    ]; //This is the IBM Code Page 437 character set. For proper charmapping, see the wikipedia page check the fontmap variable in a text editor with proper unicode support.
    //129 more characters to add, but this is good enough for demo
    for (let i = 0; i < text.length; i++) {
        const charIndex = fontCodeMap.indexOf(text.charCodeAt(i));
        const sx = charIndex * fontWidth;
        const sy = 0;
        ctx.drawImage(fonts[color], sx, sy, fontWidth, fontHeight, x + (i * fontWidth), y, fontWidth, fontHeight);
    }
}

function convertWhitePixelsToColor(image, color, bgcolor = { red: 0, green: 0, blue: 0 }) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        if (red === 255 && green === 255 && blue === 255) {
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
        } else if (red === 0 && green === 0 && blue === 0) {
            data[i] = bgcolor.red;
            data[i + 1] = bgcolor.green;
            data[i + 2] = bgcolor.blue
        } 
    }
    ctx.putImageData(imageData, 0, 0);
    const output = new Image();
    output.src = canvas.toDataURL();
    output.onload = function() {
        assetsLoaded++;
        if (assetsLoaded === 15) {
            main(); //This is here now. I hate it.
        }
    }
    return output;
}

function colorCodeConvert(colorCode) {
    const red = parseInt(colorCode.substr(1, 2), 16);
    const green = parseInt(colorCode.substr(3, 2), 16);
    const blue = parseInt(colorCode.substr(5, 2), 16);
    return { red, green, blue };
}

function fontLoader() {
    colors = [
        // index 0 == white
        "#000000", // black 1
        "#0000AA", // dark blue 2
        "#00AA00", // dark green 3
        "#00AAAA", // dark cyan 4
        "#AA0000", // dark red 5
        "#AA00AA", // dark magenta 6
        "#AA5500", // dark yellow 7
        "#AAAAAA", // light gray 8
        "#555555", // dark gray 9
        "#5555FF", // blue 10
        "#55FF55", // green 11
        "#55FFFF", // cyan 12
        "#FF5555", // red 13
        "#FF55FF", // magenta 14
        "#FFFF55", // yellow 15
        "#FFFFFF"  // white 16
    ]; //Picking colors is dark magic now
    fonts.push(font);
    for (let j = 0; j < colors.length; j++) {
        for (let i = 0; i < colors.length; i++) {
            const colorCode = colors[i];
            const color = colorCodeConvert(colorCode);
            const bgcolorCode = colors[j];
            const bgcolor = colorCodeConvert(bgcolorCode);
            const convertedFont = convertWhitePixelsToColor(font, color, bgcolor);
            fonts.push(convertedFont);
        }
    }
}

function orientationLock() {
    screen.orientation.lock("landscape-primary")
    .catch((error) => {
        //console.log(`Error: ${error.message}`);
        console.log("This device doesn't support rotation. Probably because it's a desktop.");
    });
}

function mainMenu() {
    //This is the main menu
    drawText("Main Menu", 296, 16);
    drawText("> Start", 8, 24);
    drawText("Load", 24, 40, 9);
    drawText(">", 8, 40, 0);
    drawText("> Options", 8, 56);
    drawText("> Exit", 8, 72);
}

function commandEval() {
    //Idk
}