import { isRef, ref, Ref } from 'vue';

type RefValue = string | number | object;

export function wrap(value: RefValue): Ref {
  if (isRef(value)) throw new Error('You cannot wrap a Ref');
  return ref<RefValue>(value);
}

export function unwrap<T extends RefValue>(ref: Ref | T): T | null | unknown {
  if (typeof ref === undefined) return null;
  return (isRef(ref)) ? ref.value : ref;
}
