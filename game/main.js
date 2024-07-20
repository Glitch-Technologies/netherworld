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
}

//Begin execution
main();