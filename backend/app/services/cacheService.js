const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 5 });

module.exports = {
  getFromCache: (key) => {
    return myCache.get(key);
  },
  setInCache: (key, value) => {
    myCache.set(key, value);
  },
};
