export function toLocaleDate(...params: Params) {
  return new Date(...params).toLocaleString();
}

type Params = ConstructorParameters<typeof Date>;
