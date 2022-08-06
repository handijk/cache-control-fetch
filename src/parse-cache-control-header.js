const parseCacheControlHeader = (cacheControl) =>
  cacheControl
    ? cacheControl
        .split(',')
        .filter(Boolean)
        .map((el) => el.trim().split('='))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value ? parseInt(value, 10) : true,
          }),
          {}
        )
    : {};

export default {
  parseCacheControlHeader,
};
