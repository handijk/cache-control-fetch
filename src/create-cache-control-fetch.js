import parseCacheControlHeaderModule from './parse-cache-control-header.js';

const CacheTypes = {
  NO_STORE: 'no-store',
  NO_CACHE: 'no-cache',
  MAX_AGE: 'max-age',
};

const CacheStorage = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

const CACHE_CONTROL_HEADER = 'cache-control';

export const createCacheControlFetch = ({ fetch, globalOptions }) => {
  const stats = {
    noStoreRequests: 0,
    noCacheRequests: 0,
    privateRequests: 0,
    publicRequests: 0,
    maxAges: [],
  };

  return {
    fetch: async (...args) => {
      const response = await fetch(...args, { ...globalOptions });
      const cacheControl =
        parseCacheControlHeaderModule.parseCacheControlHeader(
          response.headers.get(CACHE_CONTROL_HEADER)
        );
      if (cacheControl[CacheTypes.MAX_AGE]) {
        stats.maxAges.push(cacheControl[CacheTypes.MAX_AGE]);
      }
      if (cacheControl[CacheTypes.NO_CACHE]) {
        stats.noCacheRequests++;
      } else if (cacheControl[CacheTypes.NO_STORE]) {
        stats.noStoreRequests++;
      }
      if (cacheControl[CacheStorage.PUBLIC]) {
        stats.publicRequests++;
      }
      if (cacheControl[CacheStorage.PRIVATE]) {
        stats.privateRequests++;
      }
      return response;
    },
    getCacheControlHeader: () => {
      if (stats.noStoreRequests > 0) {
        return 'no-store';
      }
      const useCache =
        stats.privateRequests > 0
          ? CacheStorage.PRIVATE
          : stats.publicRequests > 0
          ? CacheStorage.PUBLIC
          : null;
      if (stats.noCacheRequests > 0) {
        return [useCache, 'no-cache'].filter(Boolean).join(', ');
      }
      return [
        useCache,
        stats.maxAges.length > 0
          ? `max-age=${Math.min(...stats.maxAges)}`
          : null,
      ]
        .filter(Boolean)
        .join(', ');
    },
  };
};
