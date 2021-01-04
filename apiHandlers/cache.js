const LRU = require('lru-cache');

const domCache = new LRU(15);

const tagResultCache = new LRU(10);

module.exports = { domCache, tagResultCache };
