const os = require('os');

function getSystemCheckCommand() {
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

module.exports = { getSystemCheckCommand };