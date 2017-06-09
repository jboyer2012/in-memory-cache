module.exports = {

    parse: function(input){
        const partsOfInput = input.split(' ');
        let parsedCommand = {};
        parsedCommand.command = partsOfInput[0];
        parsedCommand.name = partsOfInput[1];
        parsedCommand.value = parseInt(partsOfInput[2], 10);

        return parsedCommand;
    }
}