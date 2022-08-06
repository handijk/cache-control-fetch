# cache-control-fetch

Generate a cache control response header from multiple fetch calls.

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
