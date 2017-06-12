module.exports = {

    parse: (input) => {
        const partsOfInput = input.split(' ');
        let parsedCommand = {};

        const enteredCommand = partsOfInput[0];

        if(enteredCommand === "NUMEQUALTO"){
            parsedCommand.command = enteredCommand;
            parsedCommand.name = null;
            parsedCommand.value = parseInt(partsOfInput[1]);
        } else {
            parsedCommand.command = partsOfInput[0];
            parsedCommand.name = partsOfInput[1];
            if(partsOfInput[2]){
                parsedCommand.value = parseInt(partsOfInput[2], 10);
            } else {
                parsedCommand.value = null; // Don't like undefined, so I want to explicitly set to null.
            }
        }
        return parsedCommand;
    }
}