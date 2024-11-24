const fs = require('fs');
const { runSystemCheck } = require('./utils/runSystemCheck');

const logFileDelay = 60000;

function logUpdatesToFile(activityLogFilePath) {
  setTimeout(() => processLogUpdatesToFile(activityLogFilePath), logFileDelay);
}

function processLogUpdatesToFile(activityLogFilePath) {
  runSystemCheck(async (result) => {
    const timestamp = Date.now();
    const message = `${timestamp} : ${result.trim()}\r`;

    fs.appendFile(activityLogFilePath, message, (err) => {
      if (err) {
        console.error("Error While Saving File: ", err);
        process.exit(1);
      }
    });

    setTimeout(() => processLogUpdatesToFile(activityLogFilePath), logFileDelay);
  });
}

module.exports = { logUpdatesToFile };