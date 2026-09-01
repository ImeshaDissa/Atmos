//in memo cach

const NodeCache = require('node-cache');

const weatherCache = new NodeCache({ stdTTL: 300, checkperiod:60});//how often it cleans expired data
//5min ttl

module.exports = weatherCache;