// dice.js

const crypto = require("crypto");

function rollDice() {
    return crypto.randomInt(1, 7);
}

const numberOfRolls = 5;

console.log(`Rolling dice ${numberOfRolls} times...\n`);

for (let i = 1; i <= numberOfRolls; i++) {
    const value = rollDice();
    console.log(`Roll ${i}: Dice Rolled: ${value}`);
}