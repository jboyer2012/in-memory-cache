const should = require('should');
const parse = require('../cache/parser').parse;

describe('Command parser', function(){
    it('should return SET command when passed in', function(){
        const input = "SET a 10";
        const output = parse(input);

        output.command.should.equal("SET");
        output.name.should.equal("a");
        output.value.should.equal(10);

    });
});