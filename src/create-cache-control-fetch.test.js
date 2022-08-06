import { jest, describe, test, expect } from '@jest/globals';
import { createCacheControlFetch } from './create-cache-control-fetch.js';
import parseCacheControlHeaderModule from './parse-cache-control-header.js';

describe('createCacheControlFetch', () => {
  const mockedFetch = jest.fn(() => ({
    headers: {
      get: jest.fn(),
    },
  }));

  const parseCacheControlHeaderSpy = jest.spyOn(
    parseCacheControlHeaderModule,
    'parseCacheControlHeader'
  );

  test('when one of the calls returns public it will generate a public header', async () => {
    const { fetch, getCacheControlHeader } = createCacheControlFetch({
      fetch: mockedFetch,
    });

    parseCacheControlHeaderSpy.mockReturnValueOnce({});
    await fetch('mock-url');
    parseCacheControlHeaderSpy.mockReturnValueOnce({ public: true });
    await fetch('mock-url');

    expect(getCacheControlHeader()).toEqual('public');
  });

  test('when one of the calls returns private it will generate a private header', async () => {
    const { fetch, getCacheControlHeader } = createCacheControlFetch({
      fetch: mockedFetch,
    });

    parseCacheControlHeaderSpy.mockReturnValueOnce({ private: true });
    await fetch('mock-url');
    parseCacheControlHeaderSpy.mockReturnValueOnce({ public: true });
    await fetch('mock-url');

    expect(getCacheControlHeader()).toEqual('private');
  });

  test('when one of the calls returns no-cache it will generate a no-cache header', async () => {
    const { fetch, getCacheControlHeader } = createCacheControlFetch({
      fetch: mockedFetch,
    });

    parseCacheControlHeaderSpy.mockReturnValueOnce({ 'no-cache': true });
    await fetch('mock-url');
    parseCacheControlHeaderSpy.mockReturnValueOnce({});
    await fetch('mock-url');

    expect(getCacheControlHeader()).toEqual('no-cache');
  });

  test('when one of the calls returns no-store it will generate a no-store header', async () => {
    const { fetch, getCacheControlHeader } = createCacheControlFetch({
      fetch: mockedFetch,
    });

    parseCacheControlHeaderSpy.mockReturnValueOnce({ 'no-store': true });
    await fetch('mock-url');
    parseCacheControlHeaderSpy.mockReturnValueOnce({ 'no-cache': true });
    await fetch('mock-url');

    expect(getCacheControlHeader()).toEqual('no-store');
  });

  test('will generate a header with the shortest max-age of all max-ages returned by the fetch calls', async () => {
    const { fetch, getCacheControlHeader } = createCacheControlFetch({
      fetch: mockedFetch,
    });

    parseCacheControlHeaderSpy.mockReturnValueOnce({ 'max-age': 1 });
    await fetch('mock-url');
    parseCacheControlHeaderSpy.mockReturnValueOnce({ 'max-age': 2 });
    await fetch('mock-url');

    expect(getCacheControlHeader()).toEqual('max-age=1');
  });
});
