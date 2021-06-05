import { cache, mutate } from 'swr';

export async function mutateMany(
  select,
  update,
  shouldRevalidate: boolean | Function = true
) {
  const keys = await cache.keys();
  keys.filter(select).forEach((key) => {
    const newData = update(cache.get(key));
    return mutate(
      key,
      newData,
      typeof shouldRevalidate === 'function'
        ? shouldRevalidate(key)
        : shouldRevalidate
    );
  });
}
