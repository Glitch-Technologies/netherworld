const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

function loadStats() {
    const statBar = document.getElementById('statbar');
    statBar.innerText = `
Name: Player
Class: Warrior
Hit Points 10/20
Mana Points 15/20
Gold 100
Experience 0/100
Stats:
Strength 10
Defense 5
Agility 5
Intelligence 5
Charisma 5
Wisdom 5
Constitution 5
Perception 5
Luck 5
Status: Alive`;
}

function main() {
    loadStats();
    loadTiles();
}

function loadTiles() {
    fetch('tileref.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data["tilekeys"]).forEach(([key, value]) => {
                // Do something with each key-value pair
                console.log(key, value);
                const image = new Image();
                image.src = value;
                image.onload = () => {
                    // Do something with the loaded image
                    console.log('Image loaded:', image);
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas, scaling it to the full size of the canvas
                };
            })}
        )
        .catch(error => {
            alert('Error loading dictionary: ' + error);
        });
}

//Begin execution
main();