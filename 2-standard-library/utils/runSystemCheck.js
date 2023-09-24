const child_process = require('child_process');
const { getSystemCheckCommand } = require('./getSystemCheckCommand');
const command = getSystemCheckCommand();

function runSystemCheck(callback) {
    child_process.exec(command, {}, (err, result) => {
        if (!!err) {
            console.error(err);

            process.exit(1);
        }

        callback(result);
    });
}

module.exports = { runSystemCheck };