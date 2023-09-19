const child_process = require('child_process');
const os = require('os');
let command = getCommand();

let timeStart = (new Date()).getTime();

checkUpdates();

function checkUpdates() {
    child_process.exec(command, {}, (err, stdout) => {
        const timeEllapsed = (new Date()) - timeStart;
        writeMessageToConsole(`Time Ellapsed: ${timeEllapsed}ms, ${stdout.trim()}`);

        setTimeout(checkUpdates);
    });
}

function getCommand() {
    const terminalCommands = {
        win32: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
        POSIX: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'
    };
    
    const platform = os.platform();

    if (platform === 'win32') {
        return terminalCommands.win32;
    }

    return terminalCommands.POSIX;
}

function writeMessageToConsole(message) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
    process.stdout.write(message);
}

