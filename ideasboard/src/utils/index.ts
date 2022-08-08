import { isRef, Ref } from 'vue';

export function unrwap<T>(ref: Ref | T): T {
  return (isRef(ref)) ? ref.value : ref;
}
