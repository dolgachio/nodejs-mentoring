const {
  rewriteCurrentConsoleLine,
} = require("./rewriteCurrentConsoleLine");
const { runSystemCheck } = require("./runSystemCheck");

const logConsoleDelay = 100;

// I added to see updates even when no changes in memory usage
let timeStart = new Date().getTime();

function logUpdatesToConsole() {
  runSystemCheck((result) => {
    const timeEllapsed = new Date() - timeStart;
    rewriteCurrentConsoleLine(`${timeEllapsed}ms, ${result}`);

    setTimeout(logUpdatesToConsole, logConsoleDelay);
  });
}

module.exports = { logUpdatesToConsole };
