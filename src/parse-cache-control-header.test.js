import { describe, test, expect } from '@jest/globals';
import parseCacheControlHeaderModule from './parse-cache-control-header.js';

describe('parseCacheControlHeader', () => {
  test('returns an object containing all parts', () => {
    expect(
      parseCacheControlHeaderModule.parseCacheControlHeader(
        'public, max-age=123'
      )
    ).toEqual({
      public: true,
      'max-age': 123,
    });
  });
  test('returns an empty object with a falsy input', () => {
    expect(parseCacheControlHeaderModule.parseCacheControlHeader(null)).toEqual(
      {}
    );
  });
});
