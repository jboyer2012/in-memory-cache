let cache = {};

module.exports = {

    getCache: () => {
        return cache;
    },

    restoreCache: (snapshot) => {
        cache = snapshot;
    },

    setValue: (name, value) => {
        cache[name] = value;
    },

    getValue: (name) => {
        return cache[name] || null;
    },

    deleteValue: (name) => {
        delete(cache[name]);
    },
    
    getNumberWithValue: (value) => {
        let count = 0;
        for(const key of Object.keys(cache)){
            if(cache[key] === value) {
                ++count;
            }
        }
        return count;
    }
}