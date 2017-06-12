const should = require('should');
const cache = require('../cache/cache');

describe('Cache functions', () => {
    it('should return the set value', () => {
        cache.setValue("a", 10);
        cache.getValue("a").should.equal(10);
    });

    it('should remove a value that is unset', () => {
       cache.setValue("a", 10);
       cache.deleteValue("a");
       should.not.exist(cache.getValue("a")); 
    });

    it('should return NULL when a value is not set', () => {
        should.not.exist(cache.getValue("a"));
    });

    it('should return the correct count', () => {
        cache.setValue("a", 10);
        cache.setValue("b", 10);
        cache.setValue("c", 10);

        cache.getNumberWithValue(10).should.equal(3);
    });
});