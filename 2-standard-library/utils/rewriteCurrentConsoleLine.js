function rewriteCurrentConsoleLine(message) {
    const trimmedMessage = message.trim();
    
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
    process.stdout.write(trimmedMessage);
}

module.exports = { rewriteCurrentConsoleLine };