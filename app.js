const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter cache command: \n', (answer) => {
    console.log('Thanks for your answer: ' + answer);

    rl.close();
});