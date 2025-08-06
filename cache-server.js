const tokenCache = new Map();

function addToCache(key, value) {
  tokenCache.set(key, value);
}

// Token önbellekten alma
function getFromCache(key) {
  return tokenCache.get(key);
}
export { addToCache, getFromCache };
