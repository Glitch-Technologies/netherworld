const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.canvas.width = 320;
ctx.canvas.height = 240;


function main() {

}
// Add event listener for window resize
window.addEventListener('resize', function() {
    // Update canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    // Call main function to redraw the canvas
    main();
});
//Begin execution
main();