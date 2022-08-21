export function ObjectBuilder<T>(data: T): T {
  let obj = {} as T;
  for ( let property in data ) {
    Object.assign(obj, { [property]: data[property] });
  }

  return obj;
}
