const cacheController = require('../cache/cacheController');
const CommandObject = require('../cache/commandObject');
const should = require('should');

describe('Transactions', () => {
    it('should return NO TRANSACTION if no transaction is present on COMMIT', () => {
        const commit = new CommandObject("COMMIT", null, null);

        message = cacheController.executeCommand(commit);
        message.should.equal("NO TRANSACTION");
    });

    it('should return NO TRANSACTION if no transaction is present on ROLLBACK', () => {
        const rollback = new CommandObject("ROLLBACK", null, null);

        message = cacheController.executeCommand(rollback);
        message.should.equal("NO TRANSACTION");
    });

    it('should restore cache values on ROLLBACK', () => {
        const begin = new CommandObject("BEGIN", null, null);
        const set = new CommandObject("SET", "t", 40);
        const rollback = new CommandObject("ROLLBACK", null, null);
        const get = new CommandObject("GET", "t", null);

        cacheController.executeCommand(begin);
        cacheController.executeCommand(set);
        cacheController.executeCommand(rollback);
        message = cacheController.executeCommand(get);

        message.should.equal("NULL\n");
    });

    it('should end transaction when COMMIT is entered', () => {
        const begin = new CommandObject("BEGIN", null, null);
        const set = new CommandObject("SET", "z", 100);
        const commit = new CommandObject("COMMIT", null, null);

        cacheController.executeCommand(begin);
        cacheController.executeCommand(set);
        cacheController.executeCommand(commit);

        // second commit should fail
        message = cacheController.executeCommand(commit);

        message.should.equal("NO TRANSACTION");
    });

    it('should close transaction when last ROLLBACK is entered', () => {
        const begin = new CommandObject("BEGIN", null, null);
        const set = new CommandObject("SET", "r", 30);
        const rollback = new CommandObject("ROLLBACK", null, null);

        cacheController.executeCommand(begin);
        cacheController.executeCommand(set);
        cacheController.executeCommand(rollback);

        // No transactions should be open now
        message = cacheController.executeCommand(rollback);
        message.should.equal("NO TRANSACTION");
    })
});