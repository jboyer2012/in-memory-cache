const readline = require('readline');
const parser = require('./cache/parser');
const cacheController = require('./cache/cacheController');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});

rl.prompt();

rl.on('line', (line) => {
    const commandObject = parser.parse(line.trim());

    if(commandObject.command === "END"){
        rl.close();
    }

    console.log(cacheController.executeCommand(commandObject));

}).on('close', () => {
    process.exit(0);
});