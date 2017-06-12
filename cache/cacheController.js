let cache = require('./cache');
let transactionInProgress = false;
let numOfTransactions = 0;
let cacheSnapshots = [];

module.exports = {
    
    executeCommand: (commandObject) => {
        let message = "";
        switch (commandObject.command) {
            case "GET":
                const value = cache.getValue(commandObject.name);
                if(value){
                    message = value + "\n";
                } else {
                    message = "NULL\n";
                }
                return message;
            case "SET":
                if (!commandObject.value){
                    message = "Invalid command\n";
                }
                cache.setValue(commandObject.name, commandObject.value);
                return message;
            case "UNSET":
                cache.deleteValue(commandObject.name);
                return message;
            case "NUMEQUALTO":
                const count = cache.getNumberWithValue(commandObject.value);
                message = count + "\n";
                return message;
            case "BEGIN":
                if(transactionInProgress){
                    createSnapshot();
                } else {
                    transactionInProgress = true;
                    createSnapshot();
                }
                return message;
            case "COMMIT":
                if(transactionInProgress){
                    commit();
                    return message;
                } else {
                    message = "NO TRANSACTION";
                    return message;
                }
            case "ROLLBACK":
                if(transactionInProgress){
                    rollback();
                    return message;
                } else {
                    message = "NO TRANSACTION";
                    return message;
                }
            default:
                message = "Invalid command\n";
                return message;
        }

    }

};

/*
* Each BEGIN command will create a snapshot of the cache.
*/
function createSnapshot(){
    const snapshot = Object.assign({}, cache.getCache());
    cacheSnapshots.push(snapshot);
    numOfTransactions++;
}

/*
* A ROLLBACK command will restore the snapshot of the cache.
*/
function rollback(){
    cache.restoreCache(cacheSnapshots[numOfTransactions - 1]);
    numOfTransactions--;
    if(numOfTransactions === 0){
        transactionInProgress = false;
    }
}

/*
* Changes are already there, so simply remove all snapshots
*/
function commit(){
    cacheSnapshots.length = 0;
    numOfTransactions = 0;
    transactionInProgress = false;
}