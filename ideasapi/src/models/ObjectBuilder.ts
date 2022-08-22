export function ObjectBuilder<T>(data: T): T {
  const obj = {} as T;
  for ( let property in data ) {
    Object.assign(obj, { [property]: data[property] });
  }

  return obj;
}
