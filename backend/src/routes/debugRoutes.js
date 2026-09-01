//get api debug cache

const express = require('express');
const router = express.Router();
const weatherCache = require('../cache/cache');

router.get('/debug/cache', (req, res) => {
  const keys = weatherCache.keys();
  const status = keys.map(key => ({
    key,
    ttlRemaining: weatherCache.getTtl(key)
      ? Math.round((weatherCache.getTtl(key) - Date.now()) / 1000) + 's'//
      : 'expired'
  }));

  res.json({
    totalCached: keys.length,
    cachedItems: status
  });
});

module.exports = router;