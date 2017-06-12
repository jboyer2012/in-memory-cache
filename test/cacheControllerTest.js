// These are integration tests to test the cacheController logic
// and how it interacts with the cache.
const should = require('should');
const cache = require('../cache/cache');
const cacheController = require('../cache/cacheController');
const CommandObject = require('../cache/CommandObject');

describe('CacheController', () => {

    it('should return NULL when a GET command is entered without a SET', () => {
        const get = new CommandObject("GET", "a", null);
        const message = cacheController.executeCommand(get);
        message.should.equal("NULL\n");
    });

    it('should return value when a GET command is entered with a SET', () => {
        const get = new CommandObject("GET", "ex", null);
        const set = new CommandObject("SET", "ex", 20);

        const setMessage = cacheController.executeCommand(set);
        setMessage.should.equal("");
        const getMessage = cacheController.executeCommand(get);
        getMessage.should.equal("20\n");
    });

    it('should return empty string when a SET command is entered', () => {
        const set = new CommandObject("SET", "f", 20);
        const message = cacheController.executeCommand(set);
        message.should.equal("");
    });

    it('should return empty string when UNSET command is entered', () => {
        const unset = new CommandObject("UNSET", "a", null);
        const message = cacheController.executeCommand(unset);
        message.should.equal("");
    });

    it('should return the correct count when NUMEQUALTO is entered', () => {
        const numEqualTo = new CommandObject("NUMEQUALTO", null, 50);
        const set1 = new CommandObject("SET", "y", 50);
        const set2 = new CommandObject("SET", "z", 50);

        cacheController.executeCommand(set1);
        cacheController.executeCommand(set2);
        const message = cacheController.executeCommand(numEqualTo);
        message.should.equal("2\n");

    });

    it('should return invalid command when an invalid command is entered', () => {
        const invalidCommand = new CommandObject('Invalid', "a", 10);
        const message = cacheController.executeCommand(invalidCommand);
        message.should.equal("Invalid command\n");
    });

    it('should reject malformed SET commands', () => {
        // Someone might enter "SET a10" by accident
        const set = new CommandObject("SET", "a10", null);
        const message = cacheController.executeCommand(set);
        message.should.equal("Invalid command\n");
    });
});