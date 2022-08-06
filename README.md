# cache-control-fetch

Generate a cache control response header from multiple fetch calls.

* [Installation](#installation)
* [Usage](#usage)

## Installation

```
npm i cache-control-fetch
```

## Usage

```js
import { createCacheControlFetch } from 'cache-control-fetch';

const { fetch, getCacheControlHeader } = createCacheControlFetch({
  fetch,
  Request,
});

// responds with a cache control header: public, max-age: 3600
await fetch('http://example.com/movies.json');  

// responds with a cache control header: public, max-age: 86400
await fetch('http://example.com/actors.json');

// responds with a cache control header: private, max-age: 86400
await fetch('http://example.com/actors.json');

const cacheControlHeader = getCacheControlHeader();
console.log(cacheControlHeader); // -> private, max-age: 3600
```
