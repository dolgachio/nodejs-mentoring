const path = require("path");

const { logUpdatesToConsole } = require('./utils/logUpdatesToConsole');
const { logUpdatesToFile } = require('./utils/logUpdatesToFile');

// 1. Console update
logUpdatesToConsole();

// 2. Logging to file
const activityLogFilePath = path.join(__dirname, "activityMonitor.log");
logUpdatesToFile(activityLogFilePath);

