# cache-control-fetch

Generate a cache control response header from multiple fetch calls.
To be used when the cache control header you want to return to the client is dependent on the API calls you are making.
At the moment only public/private, no-store, no-cache and max-age support is implemented, this could be expanded in the future to other cache control directives. See [Mozilla Cache Control docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for more info on the cache control directives.

* [Installation](#installation)
* [Usage](#usage)

## Installation

```
npm i cache-control-fetch
```

## Usage

When one of the calls is private the generated cache control header will be private.

```js
import { createCacheControlFetch } from 'cache-control-fetch';

const { fetch, getCacheControlHeader } = createCacheControlFetch({
  fetch,
  Request,
});

// responds with a cache control header: public
await fetch('http://example.com/movies.json');  

// responds with a cache control header: public
await fetch('http://example.com/actors.json');

// responds with a cache control header: private
await fetch('http://example.com/actors.json');

const cacheControlHeader = getCacheControlHeader();
console.log(cacheControlHeader); // -> private
```

When one of the calls is no-cache the generated cache control header will be no-cache.

```js
import { createCacheControlFetch } from 'cache-control-fetch';

const { fetch, getCacheControlHeader } = createCacheControlFetch({
  fetch,
  Request,
});

// responds with a cache control header: public
await fetch('http://example.com/movies.json');  

// responds with a cache control header: private
await fetch('http://example.com/actors.json');

// responds with a cache control header: no-cache
await fetch('http://example.com/actors.json');

const cacheControlHeader = getCacheControlHeader();
console.log(cacheControlHeader); // -> private, no-cache
```

When one of the calls is no-cache the generated cache control header will be no-store.

```js
import { createCacheControlFetch } from 'cache-control-fetch';

const { fetch, getCacheControlHeader } = createCacheControlFetch({
  fetch,
  Request,
});

// responds with a cache control header: public
await fetch('http://example.com/movies.json');  

// responds with a cache control header: private
await fetch('http://example.com/actors.json');

// responds with a cache control header: no-store
await fetch('http://example.com/actors.json');

const cacheControlHeader = getCacheControlHeader();
console.log(cacheControlHeader); // -> no-store
```

The max-age of the generated cache control header will be the shortest max-age returned by all calls.

```js
import { createCacheControlFetch } from 'cache-control-fetch';

const { fetch, getCacheControlHeader } = createCacheControlFetch({
  fetch,
  Request,
});

// responds with a cache control header: max-age: 3600
await fetch('http://example.com/movies.json');  

// responds with a cache control header: max-age: 86400
await fetch('http://example.com/actors.json');

// responds with a cache control header: max-age: 86400
await fetch('http://example.com/actors.json');

const cacheControlHeader = getCacheControlHeader();
console.log(cacheControlHeader); // -> max-age: 3600
```
