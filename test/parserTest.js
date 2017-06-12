const should = require('should');
const parse = require('../cache/parser').parse;

describe('Command parser', () => {
    it('should return SET command when passed in', () => {
        const input = "SET a 10";
        const output = parse(input);

        output.command.should.equal("SET");
        output.name.should.equal("a");
        output.value.should.equal(10);

    });

    it('should return GET command when passed in', () => {
        const input = "GET a";
        const output = parse(input);

        output.command.should.equal("GET");
        output.name.should.equal("a");
        should.not.exist(output.value);
    });

    it('should return UNSET command when passed in', () => {
        const input = "UNSET a";
        const output = parse(input);

        output.command.should.equal("UNSET");
        output.name.should.equal("a");
        should.not.exist(output.value);
    });

    it('should return NUMEQUALTO command when passed in', () => {
        const input = "NUMEQUALTO 10";
        const output = parse(input);

        output.command.should.equal("NUMEQUALTO");
        should.not.exist(output.name);
        output.value.should.equal(10);
    });

    it('should return END command when passed in', () => {
        const input = "END"
        const output = parse(input);

        output.command.should.equal("END");
        should.not.exist(output.name);
        should.not.exist(output.value);
    });
});