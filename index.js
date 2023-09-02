const repl = require('repl');

function getRandomNumber() {
    return Math.random();
}

console.log('getRandomNumber(): ', getRandomNumber());

global.getRandomNumber = getRandomNumber;

repl.start();