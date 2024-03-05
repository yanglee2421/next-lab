export function toDeduplicate(items: unknown[], ops: Partial<Ops> = {}) {
  const { isCover = false, keyProp = "id" } = ops;

  if (!keyProp) return;

  const map = new Map();

  items.forEach((item) => {
    // Item must be an object
    if (typeof item !== "object") return;
    if (!item) return;

    // Get Key
    const key = Reflect.get(item, keyProp);

    if (!key) return;

    // Valid key-value pairs
    if (isCover) return map.set(key, item);
    map.get(key) ?? map.set(key, item);
  });

  return [...map.values()];
}

interface Ops {
  isCover: boolean;
  keyProp: string | symbol;
}
