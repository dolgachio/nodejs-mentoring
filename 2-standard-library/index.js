const path = require("path");

const { logUpdatesToConsole } = require('./logUpdatesToConsole');
const { logUpdatesToFile } = require('./logUpdatesToFile');

// 1. Console update
logUpdatesToConsole();

// 2. Logging to file
const activityLogFilePath = path.join(__dirname, "activityMonitor.log");
logUpdatesToFile(activityLogFilePath);

